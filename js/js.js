﻿var urlApi = 'https://api.themoviedb.org/3/discover/movie?';
var apiKey = 'api_key=e8c6d35a6bd555573d4b93aff5b6743b';
var total_paginas = '';

$(document).ready(function () {
    urlApi = urlApi + apiKey;
   /cargarTabla(urlApi, 1);
    $('#flecha-izda').addClass('oculto');
});

var cargarTabla = function (urlApiApiKey, numero) {
    urlApiApiKey += '&page=' + numero;
    $.get(urlApiApiKey, function (respuesta, estado) {
        if (estado === 'success') {
            $('#pagina-actual').html(respuesta.page);
            $('#total-paginas').html(respuesta.total_pages);
            total_paginas = respuesta.total_pages;

            if ((respuesta.total_pages === 1)&&(respuesta.page === 1)) {
                $('#flecha-derecha').addClass('oculto');
            } else {
                $('#flecha-derecha').removeClass('oculto');
            }

            var peliculas = '<div id="centrado">';

            $.each(respuesta.results, function (indice, elemento) {
                peliculas += '<div class="tarjeta">';
                peliculas += '<div class="idTitulo"><p class="titulo">' + elemento.title + '</p></div>';

                if ((elemento.poster_path !== null)||( elemento.poster_path === 'null')){
                    peliculas += '<img alt="' + elemento.title + '" src="https://image.tmdb.org/t/p/w500' + elemento.poster_path + '?d='+new Date()+'"/><hr>';
                } else {
                    peliculas += '<img src="./img/no-image_1024.png"' + '?d=' + new Date() +' alt="Imágen no disponible"/><hr>';
                }
                peliculas += '<p class="transition"><span>Original Title: </span>' + elemento.original_title + '</p>';
                peliculas += '<p class="detail"><span>Overview: </span>' + elemento.overview.substring(0, 100) + '</p>';
                peliculas += '<p><span>Adult:</span> ' + elemento.adult + '</p>';
                peliculas += '<p><span>Release date: </span>' + elemento.release_date + '</p>';
                peliculas += '<p><span>ID: </span>' + elemento.id + '</p>';
                peliculas += '<p><span>Vote Count: </span>' + elemento.vote_count + '</p>';
                peliculas += '<p><span>Vote Average: </span>' + elemento.vote_average + '</p>';
                peliculas += '</div>';
            });
        } else {
             peliculas = "<di><p>Películas no disponibles en estos momentos</p></div>"
        }
        document.getElementById('principal').innerHTML = peliculas + '</div>';
    });
}

$('#inicio').click(function () {
    urlApi = 'https://api.themoviedb.org/3/discover/movie?' + apiKey;
    cargarTabla(urlApi, 1);
});

$('#popularity').click(function () {
    var UrlApiPopularity = urlApi + 'certification_country=US&certification=R&sort_by=popularity&' + apiKey;
    cargarTabla(UrlApiPopularity, 1);
});

$('#voteCount').click(function () {
    var urlApiVoteCount = urlApi + 'certification_country=US&certification=R&sort_by=vote_count.desc&' + apiKey;
    cargarTabla(urlApiVoteCount, 1);
});

$('#voteAverage').click(function () {
    var urlApiVoteAverage = urlApi + 'certification_country=US&certification=R&sort_by=vote_average.desc&' + apiKey;
    cargarTabla(urlApiVoteAverage, 1);
});

$('#adultFilm').click(function () {
    var urlApiAdulFilm = urlApi + '&certification_country=US&certification.lte=R&' + apiKey;
    cargarTabla(urlApiAdulFilm, 1);
});

$('#btnBusqueda').click(function () {
    /*https://developers.themoviedb.org/3/getting-started/search-and-query-for-details*/
    var busqueda = document.getElementById('busqueda').value;
    urlApiBusqueda = 'https://api.themoviedb.org/3/search/movie?api_key=e8c6d35a6bd555573d4b93aff5b6743b&query=' + busqueda;
    cargarTabla(urlApiBusqueda, 1);
});

$('.fa-arrow-right').click(function () {
    var paginaActual = parseInt($('#pagina-actual').html());
    if ((paginaActual >= 1) && (total_paginas > paginaActual)) {
        $('#flecha-derecha').removeClass('oculto');
        $('#flecha-izda').removeClass('oculto');
        paginaActual++;
        cargarTabla(urlApi, paginaActual);
    } else {
        $('#flecha-derecha').addClass('oculto');
    }
});

$('.fa-arrow-left').click(function () {
    var paginaActual = parseInt($('#pagina-actual').html())-1;
    if (paginaActual > 1) {
        //paginaActual--;
        cargarTabla(urlApi, paginaActual);
    } else {
        cargarTabla(urlApi, 1);
        $('#flecha-izda').addClass('oculto');
    }
});

/*
 * https://developers.themoviedb.org/3/search/search-movies
 * https://www.themoviedb.org/talk/524cdcd719c29549f408721e?language=es
 * 
 */
