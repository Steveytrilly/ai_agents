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
        public function login(Request $request) {
        $validator = Validator::make(
            $request->all(),
            [
                "email" => [
                    "required",
                    "string",
                    "email",
                    "max:255",
                ],
                "password" => ["required", "string", "min:6"],
            ]

        );

        if ($validator->fails()) {
            $messages = $validator->errors()->all();
            foreach ($messages as $message) {
                return response()->json(
                    [
                        "error" => true,
                        "message" => $message,
                    ],
                    400
                );
            }
        }
        $user = User::where('email', $request->email)->first();
        if(!$user){
            return response()->json(
                [
                    "error" => true,
                    "message" => 'Opps! User with provided email not found!',
                ],400
            );
        }

        $pass = Hash::check($request->password,$user->password);
        if (!$pass) {
            Auth::logout();
            return response()->json(
                [
                    "error" => true,
                    "message" => 'Opps! You have entered invalid password',
                ],400
            );
        }

        $isActive = User::where('email', $user->email)->first();
		if(!$isActive->is_active){
            Auth::logout();
			$message = 'This account has been disabled';
            return response()->json(
                [
                    "error" => true,
                    "message" => $message,
                ],400
            );
		}
		// if(!userHasAccessToFrontendCommercial($isActive->id)){
        //     Auth::logout();
		// 	$message = 'You need access to iCeleraite FE to access the app.';
        //     return response()->json(
        //         [
        //             "error" => true,
        //             "message" => $message,
        //         ],400
        //     );
		// }

        Auth::login($user);

        $user->last_login = now();
        $user->save();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(
            [
                "error" => false,
                "message" => 'Welcome',
                "redirect_to" => route('dashboard'),
                "user" => Auth::user(),
                'token' => $token
            ],200
        );
	}
}
