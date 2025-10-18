<?php
use App\Services\CloudinaryService;

function uploadAgentImage($request)
{
    try {
        // Resolve the CloudinaryService from Laravel's service container
        $cloudinaryService = app(CloudinaryService::class);

        if ($request->hasfile('image')) {
            $file = $request->file('image');

            // Use the CloudinaryService to upload the image
            $uploadResult = $cloudinaryService->uploadAsset($file->getRealPath(), 'ai_agents');

            // Return the URL from Cloudinary's response
            if (isset($uploadResult['secure_url'])) {
                return [
                    'status' => true,
                    'file' => $uploadResult['secure_url'],
                ];
            }

            return [
                'status' => false,
                'error' => 'Failed to upload image.',
            ];
        } else {
            return [
                'status' => false,
                'message' => 'No image file provided.',
            ];
        }
    } catch (\Exception $error) {
        Log::error($error->getMessage());
        return [
            'status' => false,
            'error' => $error->getMessage(),
        ];
    }
}
function uploadAgentFiles($request)
{
    try {
        // Resolve the CloudinaryService from Laravel's service container
        $cloudinaryService = app(CloudinaryService::class);

        if ($request->hasfile('file')) {
            $file = $request->file('file');

            // Use the CloudinaryService to upload the image
            $uploadResult = $cloudinaryService->uploadAsset($file->getRealPath(), 'ai_agents_files');

            // Return the URL from Cloudinary's response
            if (isset($uploadResult['secure_url'])) {
                return [
                    'status' => true,
                    'file' => $uploadResult['secure_url'],
                ];
            }

            return [
                'status' => false,
                'error' => 'Failed to upload image.',
            ];
        } else {
            return [
                'status' => false,
                'message' => 'No image file provided.',
            ];
        }
    } catch (\Exception $error) {
        Log::error($error->getMessage());
        return [
            'status' => false,
            'error' => $error->getMessage(),
        ];
    }
}