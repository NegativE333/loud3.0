export const emailTemplate = (verificationCode: string) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .container {
            padding: 20px;
            text-align: center;
        }

        .code {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }

        span {
            padding: 3px 7px;
            border: 1px solid black;
            margin: 2px;
            border-radius: 3px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Email Verification</h1>
        <p>Your verification code is:</p>
        <p class="code">
            <span>${verificationCode.charAt(0)}</span>
            <span>${verificationCode.charAt(1)}</span>
            <span>${verificationCode.charAt(2)}</span>
            <span>${verificationCode.charAt(3)}</span>
            <span>${verificationCode.charAt(4)}</span>
            <span>${verificationCode.charAt(5)}</span>
        </p>
        <p>Please use this code to complete your registration.</p>
    </div>
</body>

</html>
`;