$(function(){
    setTimeout(() => {
      $('.galeria').addClass('vis');
    }, 1000)
    $('.galeria').on('click', '.contenedorImgs .imagen', function(){
      var imagen = $(this).data('url');
      var titulo = $(this).data('name');
      var descripcion = $(this).data('descripcion'); 
      $('.galeria').addClass('scale');
      $(this).addClass('activa');
      if(!$('.fullPreview').length){
        $('body').append(`
          <div class="fullPreview">
            <div class="cerrarModal"></div>
            <div class="wrapper">
              <div class="blur" style="background-image:url(${imagen})"></div>
              <p class="titulo">${titulo}</p>
              <img src="${imagen}">
              <p class="desc">${descripcion}</p>
            </div>
            <div class="controles">
              <div class="control av"></div>
              <div class="control ret"></div>
            </div>
          </div>`
        )
        $('.fullPreview').fadeIn().css('display','flex');
      }
    })
    $('body').on('click', '.fullPreview .cerrarModal', function(){
      $('.contenedorImgs .imagen.activa').removeClass('activa');
      $('.galeria').removeClass('scale');
      $(this).parent().fadeOut(function(){
        $(this).remove();
      })
    })
    $('body').on('click', '.fullPreview .control', function(){
      var activa = $('.contenedorImgs .imagen.activa');
      var index;
      if($(this).hasClass('av')){
          index = activa.next().index();
        if(index < 0) index = 0;
      }else{
        index = activa.prev().index();
        if(index < 0) index = $(".contenedorImgs").children().length + 1 ;
      }
      $('.fullPreview').addClass('anim');
      setTimeout(()=>{
        $('.contenedorImgs .imagen.activa').removeClass('activa');
        $('.contenedorImgs .imagen').eq(index).addClass('activa');
        $('.fullPreview').find('.blur').css('background-image', 'url('+ $(activa).data('url')+')');
        $('.fullPreview').find('img').attr('src', $(activa).data('url'));
        $('.fullPreview').find('.titulo').text($(activa).data('name'));
        $('.fullPreview').find('.desc').text($(activa).data('descripcion'));
        $('.fullPreview').removeClass('anim');
      }, 500)
    })
  })