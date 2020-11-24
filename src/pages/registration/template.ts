const template = `
<main>
    <form name="registration">
        <div class="container">

            <h1 class="title-bar title-font">#ЧАТ</h1>

            <div class="centered-container">
                {{{firtName}}}
                {{{secondName}}}
                {{{login}}}
                {{{email}}}
                {{{phone}}}
                {{{password}}}
            </div>

            <div class="centered-container">
                {{{button}}}
                {{{registrationError}}}
            </div>
            <div class="centered-container">
                {{{toLogin}}}
            </div>
        </div>
    </form>
</main>
`;

export default template;
