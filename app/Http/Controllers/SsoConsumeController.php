<?php

namespace App\Http\Controllers;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class SsoConsumeController extends Controller
{
        public function consume(Request $request)
    {
        $token = $request->query('token');
        if (!$token) abort(400, 'Missing token');

        $publicKey = config('sso.public_key');

        try {
            $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));
        } catch (\Throwable $e) {
            abort(401, 'Invalid token');
        }

        // Basic claim checks
        $iss = config('sso.issuer');
        $aud = config('sso.audience');
        if (($decoded->iss ?? null) !== $iss) abort(401, 'Bad iss');
        if (($decoded->aud ?? null) !== $aud) abort(401, 'Bad aud');

        // Prevent replay: ensure jti has not been seen here before
        $jti = $decoded->jti ?? null;
        if (!$jti) abort(401, 'Missing jti');
        $cacheKey = "sso:used_jti:{$jti}";
        if (Cache::has($cacheKey)) abort(401, 'Token already used');
        // mark jti used until token expiry
        $ttl = max(1, ($decoded->exp ?? time()) - time());
        Cache::put($cacheKey, 1, $ttl);

        // Find or create the local user (you control how to map)
        $email = $decoded->email ?? null;
        if (!$email) abort(422, 'No email in token');

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $decoded->name ?? Str::before($email, '@'),
                // set any defaults you need
                'password' => bcrypt(Str::random(32)), // random since SSO handles auth
            ]
        );

        // Start App2’s own session
        Auth::login($user, true);

        // If App2 is an API SPA, also mint a Sanctum token and set as HttpOnly cookie
        // $apiToken = $user->createToken('sso')->plainTextToken;
        // return redirect('/dashboard')->cookie(
        //   'app2_token', $apiToken, 120, '/', null, true, true, false, 'Lax'
        // );

        return redirect('/dashboard');
    }
}
