export const template = `
<main>
    <form name="login" onsubmit="return logForm()">
        <div class="container">
            <h1 class="title-bar title-font">#ЧАТ</h1>

            <div class="centered-container">
                {{login.element}}
                {{{password}}}
            </div>

            <div class="centered-container">
                {{{button}}}
            </div>
            <div class="centered-container">
                <a class="caption" href="../registration/registration.html">Регистрация</a>
            </div>
        </div>
    </form>
</main>
`; 