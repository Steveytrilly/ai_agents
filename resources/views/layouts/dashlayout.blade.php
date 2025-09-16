@extends('layouts.rootlayout')
@section('content')
<div class="relative w-full h-full flex gap-x-4">
            <!-- Sidenav -->
            <x-nav.side-nav  /> 
            <!-- Sidenav -->

            <div class="body  md:ml-[100px] rounded-2xl  right-0 left-0 flex flex-col">
                 <!-- Topnav -->               
                     <Top-Vue :title='@json($title)'> </Top-Vue>
                   <!-- Topnav -->
                   <!-- left-[80px] md:left-[100px] max-[861px]:-ml-[80px] max-[861px]:-mr-[17px] right-4 top-2 absolute dark:bg-main-alt bottom-1 pb-10 mb-2 mt-[75px] rounded-2xl overflow-hidden  max-[680px]:overflow-auto isScrollable -->
                <main
                    class="min-[861px]:left-[100px] max-sm:p-[9px]  max-md:h-fit max-sm:h-auto max-[861px]:ml-[18px] max-[861px]:right-5 max-sm:ml-0 right-7 max-sm:mr-0 max-sm:right-0 top-2 absolute dark:bg-main-alt bottom-1 pb-10 mb-2 mt-[75px] rounded-2xl   isScrollable w-[93%] max-sm:w-full" style="width: -webkit-fill-available;"
                    id="app-wrap">
                    @yield('main')
                </main>
            </div>
        </div>

@endsection



