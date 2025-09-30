<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiAgentsModel extends Model
{
    protected $table = 'ai_agents';
    protected $appends = ['agent_type', 'actions'];

    // Accessor for agent_type
    public function getAgentTypeAttribute()
    {
        $user = User::find($this->user_id);

        if (! $user) {
            return null; // or default
        }

        return $user->user_type === 'admin' ? 'dfy' : 'personal';
    }
    public function getActionsAttribute()
    {
        return AgentActionsModel::where('agent_id', $this->id)->get();
    }
}
