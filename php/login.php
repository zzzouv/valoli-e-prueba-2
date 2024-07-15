<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conexion_path = 'conexion.php';
if (file_exists($conexion_path)) {
    include $conexion_path;
} else {
    die("<script>alert('Error de configuración del servidor'); window.location.href='../login.html';</script>");
}

if (!isset($conn) || $conn->connect_error) {
    die("<script>alert('Error de conexión a la base de datos'); window.location.href='../login.html';</script>");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_usuario = isset($_POST['nombre_usuario']) ? $_POST['nombre_usuario'] : '';
    $contrasena = isset($_POST['contrasena']) ? $_POST['contrasena'] : '';

    $sql = "SELECT id, nombre_usuario, contrasena FROM usuarios WHERE nombre_usuario=? OR correo_electronico=?";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        die("<script>alert('Error del servidor'); window.location.href='../login.html';</script>");
    }

    $stmt->bind_param("ss", $nombre_usuario, $nombre_usuario);
    
    if (!$stmt->execute()) {
        die("<script>alert('Error del servidor'); window.location.href='../login.html';</script>");
    }

    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if ($contrasena === $row['contrasena']) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['nombre_usuario'];
            header("Location: ../index.html");
            exit();
        } else {
            $error = "Contraseña incorrecta";
        }
    } else {
        $error = "Usuario no encontrado";
    }

    $stmt->close();
    $conn->close();

    if (isset($error)) {
        echo "<script>alert('$error'); window.location.href='../login.html';</script>";
        exit();
    }
} else {
    echo "<script>alert('Método no permitido'); window.location.href='../login.html';</script>";
}
?>