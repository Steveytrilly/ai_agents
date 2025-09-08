<?php

return [
    'issuer' => env('SSO_ISSUER'),
    'audience' => env('SSO_AUDIENCE'),
    'public_key' => file_get_contents(base_path(env('SSO_PUBLIC_KEY_PATH'))),
];
