<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiAgentsModel extends Model
{
    protected $table = 'ai_agents';
    protected $appends = ['actions'];

    public function getActionsAttribute()
    {
        return AgentActionsModel::where('agent_id', $this->id)->get();
    }
}
