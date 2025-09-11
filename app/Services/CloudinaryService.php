<?php

namespace App\Services;

use Cloudinary\Cloudinary;

class CloudinaryService
{
    protected $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary(config('cloudinary.cloud_url'));
    }

    public function uploadAsset($filePath, $folder, $resourceType = 'auto')
    {
        return $this->cloudinary->uploadApi()->upload($filePath, [
            'folder' => $folder,
            'resource_type' => $resourceType
        ]);
    }
}
