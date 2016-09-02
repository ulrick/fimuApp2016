/* ======= Acceuil ======= */

$(document).ready(function(){
  $('.menu-trigger').on('click', function(){
    $('.menu').toggleClass('expand');
    return false;
  });
});


/* ======= Groupes ======= */

$(function(){
    $("div#G_sous_menu form div#G_filtres").hide();
    $("div#G_sous_menu form div#G_sous_menu ul li a ").click(function(){
        $("div#G_filtres").slideDown('slow');
    });
});



/*----------------- clique sur image d'un groupe, déroulement de la description du groupe-----*/


jQuery(document).ready(function()
{
    // On cache la zone de texte
    jQuery('.G_description').hide();
    // toggle() lorsque le lien avec l'ID #toggler est cliqué
    jQuery('.G_groupe').click(function(){
        var id = $(this).attr('id');
        console.log(id);

        //$(this).find('G_description').toggle(600);
        console.log($('G_groupe').not($(this)).find('.G_description'));
        $(this).find('.G_description').toggle(600);
        $('.G_groupe').not($(this)).find('.G_description').hide();
        //$('.G_description, .G_description1, .G_description2, .G_description4, .G_description5, .G_description6, .G_description7, .G_description8').hide();
        //$('.rectangle1, .rectangle2').show();
    });


});

/*-----------------Filtre pour les groupes-----*/
jQuery(document).ready(function()
{
   // click sur la nav
    jQuery('.G_filtres a').click(function(event){
        // on enleve l'évenement du click par defaut
        event.preventDefault();
        // on recupere l'attribut data-filter du lien
        var filter = $(this).attr('data-filter');
        var groupes = $('.G_groupe');
        groupes.each(function() {
             // on recupere l'attribut data-filter du groupe
            var filterGroupe = $(this).attr('data-filter');
            // on compare les attributs 
            if(filter === filterGroupe){
                $(this).show();
            }else if(filter === 'tous'){
               $(this).show();
            }else{
                $(this).hide();
            }
            
        
        });
    });
});





/* ============================= Triangles gris ============================*/

$(function(){
    var width = $(window).width();
    var hash;
    jQuery.easing.def = "easeInOutQuad";
    
    $(document).ready(function() {  
    }); 
    
    function resize(){                                                         
        width = $(window).width();
        $('.F_triangle').css({borderLeftWidth:width});
    }

    $(window).on('resize', function() {
        resize();
    });
    resize(); 
});




/* ======================== ANcre ===========================*/

$(function(){
            var width = $(window).width();
            var hash;
            jQuery.easing.def = "easeInOutQuad";
            
            $(document).ready(function() {  }); 
            
            function resize(){                                                         
                width = $(window).width();
                $('.F_triangle').css({borderLeftWidth:width});
            }

            $('.F_ancre').click(function(){                  
                var href = $.attr(this, 'href');
                $('html, body').animate({
                    scrollTop: $(href).offset().top
                }, 1000,function () {
                    window.location.hash = href;
                });
                return false;
            });
            
            $(window).on('resize', function() {
                resize();
            });
            resize(); 
        });


/*================== menu ===============*/

/*var positionElementInPage = $('.F_sousmenu').offset.top();
$(window).scroll(
    function() {
        if ($(window).scrollTop() >= positionElementInPage) {
            // fixed
            $('.F_sousmenu').addClass("menufixe");
        } else {
            // relative
            $('.F_sousmenu').removeClass("menufixe");
        }
    }
);*/

