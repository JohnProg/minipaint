(function(window, document, undefined)
{

    window.App = (function()
    {

        var _init = false, app = { };

        app.init = function()
        {
            if (_init) {
                return;
            }
            _init = true;

            var nav_open = false,
                $inner = $('#inner-wrap');

            $('#nav-open-btn').on('click', function(e)                
            {e.preventDefault();debugger
                if (!nav_open) {
                    $inner.animate({ left: '15%' }, 300);
                    nav_open = true;
                    return false;
                }else{
                    $inner.animate({ left: '0' }, 300);
                    nav_open = false;
                    return false;
                }

            });

            $('#nav-close-btn').on('click', function()
            {
                if (nav_open) {
                    $inner.animate({ left: '0' }, 300);
                    nav_open = false;
                    return false;
                }
            });
            /*$(document).on('click', function(e){
             if (nav_open && !hasParent(e.target, 'nav')) {
             e.preventDefault();
             //app.closeNav();
             }
             });*/
            $(document.documentElement).addClass('js-ready');
        };

        return app;

    })();

    window.App.init();

})(window, window.document);