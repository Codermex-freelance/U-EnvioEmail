document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email:   '',
        asunto:  '',
        mensaje: ''
    }

    //Seleccionar los elementos del interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

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

    /*inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    */
    inputEmail.addEventListener('input', validar);//a diferencia del blur si ponemos input es la validacion en tiempo real en cambio con blur tarda mas
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        //Reiniciar el objeto
        resetFormulario();
    })

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();
            //Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            },3000);
        },3000);
    }

    function validar(e){
        //console.log('desde la FN de validar');
        //console.log(e.target.value);
        if (e.target.value.trim() === ''){
            ///console.log('Esta vacio');
            mostrarAlerta(` El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';//reiniciamos cuando borramos uno de los imput
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //Comprobar el objeto de email
        comprobarEmail()
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

    function comprobarEmail(){
        //verifica que todos los campos este seño y si es asi devuelve false de lo contrario true
        //console.log(Object.values(email).includes(''));
        if (Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.classList.remove('opacity-50');//eliminamos clase
        btnSubmit.disabled = false;
    }

    function resetFormulario(){
        //Reiniciar el objeto
        email.email ='';
        email.asunto ='';
        email.mensaje ='';

        formulario.reset();
        comprobarEmail();
    }
});