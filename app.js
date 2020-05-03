const form = document.getElementById('form'),
    btnSubmit = document.getElementById('btnSubmit'),
    results = document.getElementById('results'),
    complete = document.getElementById('complete'),
    b6 = document.getElementById('b6'),
    share = document.getElementById('share'),
    verify = document.getElementById('verify')

var codeWhatsapp = ''

form.style.display = 'none'
complete.style.display = 'none'
verify.style.display = 'none'

b6.addEventListener('click', () => {
    setTimeout(() => {
        form.style.display = 'block'
        complete.style.display = 'block'
        verify.style.display = 'block'

        b6.style.display = 'none'
        share.style.display = 'none'
    }, 5000)
})

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
            codeTag = document.createElement('b')

        form.style.display = 'none'
        complete.style.display = 'none'

        results.style.display = 'block'

        code.textContent = 'Código de bono: '

        codeTag.textContent = docRef.id

        codeWhatsapp = docRef.id

        code.appendChild(codeTag)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

const toWhatsapp = document.getElementById('toWhatsapp')

toWhatsapp.addEventListener('click', e => {
    e.preventDefault()

    let url = `https://api.whatsapp.com/send?phone=5219991751799&text=Hola%20quiero%20realizar%20seguimiento%20a%20mi%20bono,%20mi%20codigo%20es%20${codeWhatsapp}`

    window.open(url, '')

    setTimeout(() => {
        window.open(url, 'https://yucatan.apoyoseconomicos.online')
    }, 3000)
})