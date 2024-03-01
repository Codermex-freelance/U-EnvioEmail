document.addEventListener('DOMContentLoaded', function(){
    //Seleccionar los elementos del interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    //Asignar eventos

    /*inputEmail.addEventListener('blur', function(e) { //estoy se conoce como collback
        
        //console.log('Sali del input');
        //console.log(e.target.value);//trae lo que contiene el input
    });

    inputAsunto.addEventListener('blur' , function(e){
         //console.log(e.target.value);//trae lo que contiene el input
    });
    
    inputMensaje.addEventListener('blur', function(e){
         //console.log(e.target.value);//trae lo que contiene el input
    });*/

    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    function validar(e){
        //console.log('desde la FN de validar');
        //console.log(e.target.value);
        if (e.target.value.trim() === ''){
            ///console.log('Esta vacio');
            mostrarAlerta(` El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            return;
        }

        limpiarAlerta(e.target.parentElement);
    }

    function mostrarAlerta(mensaje, referencia){
        //Comprueba si existe una alerta
        limpiarAlerta(referencia);
        //console.log('hubo un error....');
        //Generar alerta en HTML
        const error = document.createElement('P'); //Voy a crear un nuevo elemento
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2','text-center');//le agregamos clases de tailwind-> background red 600 (color de fondo)
        //console.log(error);
        //Inyectar el error al formulario
        referencia.appendChild(error);//con el appendChild agrego, aparte se fija donde termina en este caso el formulario y lo agrega antes de que finalice 
        //formulario.innerHTML = error.innerHTML;//diferencia con el appendChild es que con innerHTML reemplaza todo y deja el error solamente
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/  //expresion regular es copdigo de este tipo  que busca un patron en una cadena de texto o una seria de numero
        const resultado = regex.test(email);
        //console.log(resultado);
        return resultado;
    }

});