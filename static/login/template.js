export const template = `
<main>
        <form name="login" onsubmit="return logForm()">
            <div class="container">
                <h1 class="title-bar title-font">#ЧАТ</h1>

                <div class="centered-container">
                    <div class="field">
                        <label for="login">Логин</label>
                        <input id="login" class="field" type="text" value="" />
                    </div>
                    <div class="field">
                        <label for="password">Пароль</label>
                        <input id="password" class="field" type="password" value="" />
                    </div>
                </div>

                <!-- <div class="centered-container">
                    <input class="button button-login" type="submit" value="Войти" />
                </div> -->
                {{{button}}}
                <div class="centered-container">
                    <a class="caption" href="../registration/registration.html">Регистрация</a>
                </div>
            </div>
        </form>
    </main>
`; 