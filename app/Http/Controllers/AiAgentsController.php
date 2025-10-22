<?php

namespace App\Http\Controllers;

use App\Models\AgentActionsModel;
use App\Models\AiAgentsModel;
use Auth;
use Illuminate\Http\Request;
use Log;
use Str;
use Validator;
class AiAgentsController extends Controller
{
    public function index(Request $request)
    {
        try {
            $request->dfy = $request->dfy == 1 ? true : false;
            if($request->dfy){
                $aiAgents = AiAgentsModel::where('agent_type', 'dfy')->get();
                return response()->json([
                    'success' => true,
                    'data' => $aiAgents,
                ], 200);
            }
            $aiAgents = AiAgentsModel::where('user_id', Auth::id())->get();

            return response()->json([
                'success' => true,
                'data' => $aiAgents,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching AI Agents: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch AI Agents: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function create(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required|string|max:255',
                    'description' => 'nullable|string',
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
            // Assuming you have an AiAgentsModel to handle the database operations
            $image = $request->file('image') ? uploadAgentImage($request) : ['file' => 'https://res.cloudinary.com/dkykwfhy5/image/upload/v1757423939/ai_agents/tv6gmhwvmzwrxsaitbr1.jpg'];

            $aiAgent = new AiAgentsModel();
            $aiAgent->name = $request->name;
            $aiAgent->user_id = Auth::id(); // assuming user is authenticated
            $aiAgent->description = $request->description;
            $aiAgent->category_id = Auth::id(); // assuming user is authenticated
            $aiAgent->run_id = Str::uuid();
            $aiAgent->agent_uuid = Str::uuid();
            $aiAgent->agent_type = Auth::user()->user_type == 'admin' ? 'dfy' : 'personal';
            $aiAgent->agent_image = $image['file']; // default image
            $aiAgent->save();

            return response()->json([
                'success' => true,
                'message' => 'AI Agent created successfully',
                'data' => $aiAgent,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error creating AI Agent: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create AI Agent: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function edit(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'agent_id' => 'required|integer|exists:ai_agents,id',
                    'name' => 'sometimes|required|string|max:255',
                    'description' => 'sometimes|nullable|string',
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

            $aiAgent = AiAgentsModel::where('id', $request->agent_id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$aiAgent) {
                return response()->json([
                    'success' => false,
                    'message' => 'AI Agent not found or you do not have permission to edit it',
                ], 404);
            }

            if ($request->has('name')) {
                $aiAgent->name = $request->name;
            }
            if ($request->has('description')) {
                $aiAgent->description = $request->description;
            }
            if ($request->hasFile('image')) {
                $image = uploadAgentImage($request);
                if ($image['status']) {
                    $aiAgent->agent_image = $image['file'];
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Image upload failed: ' . ($image['error'] ?? 'Unknown error'),
                    ], 400);
                }
            }
            $aiAgent->save();

            return response()->json([
                'success' => true,
                'message' => 'AI Agent updated successfully',
                'data' => $aiAgent,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error updating AI Agent: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update AI Agent: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function duplicate(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'agent_id' => 'required|integer|exists:ai_agents,id',
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

            $aiAgent = AiAgentsModel::where('id', $request->agent_id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$aiAgent) {
                return response()->json([
                    'success' => false,
                    'message' => 'AI Agent not found or you do not have permission to duplicate it',
                ], 404);
            }

            $newAiAgent = $aiAgent->replicate();
            $newAiAgent->name = $aiAgent->name . ' (Copy)';
            $newAiAgent->save();

            return response()->json([
                'success' => true,
                'message' => 'AI Agent duplicated successfully',
                'data' => $newAiAgent,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error duplicating AI Agent: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to duplicate AI Agent: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function delete(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'agent_id' => 'required|integer|exists:ai_agents,id',
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

            $aiAgent = AiAgentsModel::where('id', $request->agent_id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$aiAgent) {
                return response()->json([
                    'success' => false,
                    'message' => 'AI Agent not found or you do not have permission to delete it',
                ], 404);
            }

            $aiAgent->delete();

            return response()->json([
                'success' => true,
                'message' => 'AI Agent deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting AI Agent: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete AI Agent: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function useAgent(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'agent_id' => 'required|integer|exists:ai_agents,id',
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

            $aiAgent = AiAgentsModel::where('id', $request->agent_id)->first();

            if (!$aiAgent) {
                return response()->json([
                    'success' => false,
                    'message' => 'AI Agent not found or you do not have permission to use it',
                ], 404);
            }

            $newAiAgent = $aiAgent->replicate();
            $newAiAgent->user_id = Auth::id(); // Assign to current user
            $newAiAgent->run_id = Str::uuid();
            $newAiAgent->agent_uuid = Str::uuid();
            $newAiAgent->agent_type = Auth::user()->user_type == 'admin' ? 'dfy' : 'personal';
            $newAiAgent->name = $aiAgent->name . ' (Copy)';
            $newAiAgent->save();

            return response()->json([
                'success' => true,
                'message' => 'AI Agent used successfully',
                'data' => $newAiAgent,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error duplicating AI Agent: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to duplicate AI Agent: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function build(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'agent_id' => 'required|integer|exists:ai_agents,id',
                    'action_data' => 'array',
                ]
            );
    
            if ($validator->fails()) {
                return response()->json([
                    "error" => true,
                    "message" => $validator->errors()->first(),
                ], 400);
            }
    
            $aiAgent = AiAgentsModel::where('id', $request->agent_id)
                ->where('user_id', Auth::id())
                ->first();
    
            if (!$aiAgent) {
                return response()->json([
                    'success' => false,
                    'message' => 'AI Agent not found.',
                ], 404);
            }
    
            $active = $request->boolean('active', false);
    
            $existingAction = AgentActionsModel::where('agent_id', $aiAgent->id)
                ->where('user_id', Auth::id())
                ->first();
    
            if ($existingAction) {
                // ✅ Replace the entire array with what frontend sends
                $existingAction->action_data = json_encode($request->action_data);
                $existingAction->active = $active;
                $existingAction->variables = $request->variables ?? json_encode($request->variables);
                $existingAction->save();
    
                $action = $existingAction;
                $action->action_data = $request->action_data; // return decoded
            } else {
                // Create new
                $newAction = new AgentActionsModel();
                $newAction->user_id = Auth::id();
                $newAction->agent_id = $aiAgent->id;
                $newAction->active = $active;
                $newAction->action_data = json_encode($request->action_data);
                $newAction->action_type = $request->action ?? 'default';
                $newAction->variables = $request->variables ?? json_encode($request->variables);
                $newAction->save();
    
                $action = $newAction;
                $action->action_data = $request->action_data;
            }
    
            return response()->json([
                'success' => true,
                'message' => 'Action saved successfully',
                'data' => $action,
            ], 200);
    
        } catch (\Exception $e) {
            Log::error('Error adding AI Agent action: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to save AI Agent action: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function agentDetails($agentId)
    {
        try {
            $aiAgent = AiAgentsModel::where('id', $agentId)->where('user_id', Auth::id())->first();

            if (!$aiAgent) {
                return response()->json([
                    'success' => false,
                    'message' => 'AI Agent not found.',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $aiAgent,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching AI Agent details: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch AI Agent details: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function uploadFile(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'file' => 'required|file|max:10120', // max 10MB
                ]
            );

            if ($validator->fails()) {
                return response()->json([
                    "error" => true,
                    "message" => $validator->errors()->first(),
                ], 400);
            }

            if ($request->hasFile('file')) {
                $file = uploadAgentFiles($request);
                if(!$file['file']){
                    return response()->json([
                        'success' => false,
                        'message' => 'File upload failed: ' . ($file['error'] ?? 'Unknown error'),
                    ], 400);
                }
                return response()->json([
                    'success' => true,
                    'message' => 'File uploaded successfully',
                    'data' => [
                        'file_path' => $file['file'],
                    ],
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No file uploaded',
                ], 400);
            }
        } catch (\Exception $e) {
            Log::error('Error uploading file: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload file: ' . $e->getMessage(),
            ], 500);
        }
    }
}

