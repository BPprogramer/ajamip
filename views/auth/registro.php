<main class="auth">
    <h2 class="auth__heading"><?php echo $titulo?></h2>
    <p class="auth__texto">Registrate Completando todos los campo</p>

    <?php require_once __DIR__.'/../templates/alertas.php'; ?>

    <form class="formulario" action="/registro" method="post">
        <div class="formulario__campo">
            <label for="nombre" class="formulario__label">Nombre:</label>
            <input 
                type="nombre"
                class="formulario__input"
                placeholder="Tu Nombre"
                id="nombre"
                name="nombre"
                value="<?php echo $usuario->nombre?>"
             >
        </div>
        <div class="formulario__campo">
            <label for="apellido" class="formulario__label">Apellido:</label>
            <input 
                type="apellido"
                class="formulario__input"
                placeholder="Tu Apellido"
                id="apellido"
                name="apellido"
                value="<?php echo $usuario->apellido?>"
             >
        </div>
        <div class="formulario__campo">
            <label for="email" class="formulario__label">Email:</label>
            <input 
                type="email"
                class="formulario__input"
                placeholder="Tu Email"
                id="email"
                name="email"
                value="<?php echo $usuario->email?>"
             >
        </div>
        <div class="formulario__campo">
            <label for="password" class="formulario__label">Password:</label>
            <input 
                type="password"
                class="formulario__input"
                placeholder="Tu Password"
                id="password"
                name="password"
             >
        </div>
        <div class="formulario__campo">
            <label for="password2" class="formulario__label">Repetir Password:</label>
            <input 
                type="password"
                class="formulario__input"
                placeholder="repetir Password"
                id="password2"
                name="password2"
             >
        </div>
        <input type="submit" class="formulario__submit" value="Crear Cuenta">
    </form>

    <div class="acciones">
        <a href="/login" class="acciones__enlace">¿Ya tienes cuenta? Iniciar Sesión </a>
        <a href="/olvide" class="acciones__enlace">¿Olvidaste Tu Password?</a>
    </div>
</main>