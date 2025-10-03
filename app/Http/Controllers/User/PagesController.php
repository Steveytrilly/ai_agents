<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PagesController extends Controller
{
    private $template;

    public function __construct()
    {
        $this->template = "pages";
    }

     public function Login()
    {
        $data['title'] = 'Login';
        return view($this->template . '.auth.login', $data);
    }

    public function dashboard()
    {
        $data['title'] = 'Dashboard';
        return view('layouts.dashlayout', $data);
    }

       public function home()
    {
        $data['title'] = 'Dashboard';
     return view($this->template . '.dashboard.home', $data);
    }

  

    public function agent()
    {
        $data['title'] = 'Agents';
        return view($this->template . '.dashboard.Agents.agent', $data);
    }

     public function builder($agentId)
    {
        $data['title'] = 'Builder';
        $data['agentId'] = $agentId;  
        return view($this->template . '.dashboard.Agents.builder', $data);
    }
    
    
}