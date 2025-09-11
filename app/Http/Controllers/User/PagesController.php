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
        return view('dashboard', $data);
    }
}