const form = document.getElementById('form'),
    btnSubmit = document.getElementById('btnSubmit'),
    results = document.getElementById('results')

results.style.display = 'none'

form.addEventListener('submit', e => {
    e.preventDefault()

    btnSubmit.textContent = 'Registrando datos...'

    let name = document.getElementById('name').value,
        email = document.getElementById('email').value,
        city = document.getElementById('city').value,
        contact = document.getElementById('contact').value

    let user = {
        name,
        email,
        city,
        contact
    }

    // Firebase
    addUser(user)
})

const addUser = user => {
    var db = firebase.firestore();

    db.collection("users").add(user)
    .then(function(docRef) {
        let code = document.getElementById('code'),
            codeTag = document.createElement('b'),
            complete = document.getElementById('complete')

        form.style.display = 'none'
        complete.style.display = 'none'

        results.style.display = 'block'

        code.textContent = 'Código de bono: '

        codeTag.textContent = docRef.id

        code.appendChild(codeTag)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}