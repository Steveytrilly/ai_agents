<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Hash;
use Illuminate\Http\Request;
use Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                "email" => ["required", "string", "email", "max:255"],
                "password" => ["required", "string", "min:6"],
            ]
        );

        if ($validator->fails()) {
            $messages = $validator->errors()->all();
            return response()->json([
                "error" => true,
                "message" => $messages[0], // return first error
            ], 400);
        }

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            Auth::logout();
            return response()->json([
                "error" => true,
                "message" => 'Invalid email or password',
            ], 400);
        }

        if (! $user->is_active) {
            Auth::logout();
            return response()->json([
                "error" => true,
                "message" => 'This account has been disabled',
            ], 400);
        }

        // ✅ Session login
        Auth::login($user);
        $request->session()->regenerate(); // important for session security

        $user->last_login = now();
        $user->save();

        return response()->json([
            "error" => false,
            "message" => 'Welcome',
            "redirect_to" => route('dashboard'),
            "user" => Auth::user(),
        ], 200);
    }
}
