<!DOCTYPE html>
<html>
    <head>
        <title>Register - NorthWind</title>
    </head>
    <body>
        <h1>Register</h1>
        <form action="<?php echo (isset($_SERVER['HTTPS']) ? 'https://' : 'http://').$_SERVER['SERVER_NAME'].dirname($_SERVER['REQUEST_URI'])."/api/register" ?>" method="post">
            <input type="text" name="first_name" placeholder="First Name">
            <input type="text" name="last_name" placeholder="Last Name">
            <input type="text" name="company" placeholder="Company"> 
            <input type="text" name="email_address" placeholder="Email Address">
            <input type="text" name="job_title" placeholder="Job Title">
            <input type="text" name="address" placeholder="Address">
            <input type="text" name="city" placeholder="City">
            <input type="text" name="state_province" placeholder="State">
            <input type="text" name="zip_postal_code" placeholder="Zip Code">
            <input type="text" name="country_region" placeholder="Country">
            <input type="text" name="home_phone" placeholder="Home Phone">
            <input type="submit" value="Sign Up">
        </form>
    </body>
</html>