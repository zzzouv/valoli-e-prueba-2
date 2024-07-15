<?php
header('Content-Type: text/html; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conexion_path = 'conexion.php';
if (file_exists($conexion_path)) {
    include $conexion_path;
    echo "Conexión incluída correctamente. <br>";
} else {
    die("Error: No se pudo encontrar el archivo de conexión.");
}

if (isset($conn)) {
    echo "Conexión establecida. <br>";
} else {
    die("Conexión fallida.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_usuario = $_POST['nombre_usuario'];
    $correo_electronico = $_POST['correo_electronico'];
    $contrasena = $_POST['contrasena'];

    $sql = "INSERT INTO usuarios (nombre_usuario, correo_electronico, contrasena) VALUES ('$nombre_usuario', '$correo_electronico', '$contrasena')";

    if ($conn->query($sql) === TRUE) {
        echo "Usuario registrado correctamente!";
        // Redirigir al usuario a la página de inicio de sesión
        header("Location: ../login.html");
        exit();
    } else {
        echo "Error al registrar: " . $conn->error;
    }

    $conn->close();
} else {
    echo "Por favor, envía el formulario de registro.";
}
?>
