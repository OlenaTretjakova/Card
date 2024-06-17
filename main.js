async function CheckLoad(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}


async function createCard(Contents) {
    const liCard = document.createElement('li');
    liCard.classList.add('item');
    liCard.id = Contents.id;

    const liPicture = document.createElement('img');

    const imageLoaded = await CheckLoad(Contents.profilePicture);
    
    if (imageLoaded) {
        liPicture.src = Contents.profilePicture;
        liPicture.classList.add('picture');

        liCard.appendChild(liPicture);
    
    } else {
        liCard.style.background = 'aliceblue';
        const nameDiv = document.createElement('div');
        if(Contents.firstName ==""||Contents.lastName =="")
            {
                nameDiv.textContent = "";
            }
            else
            {
                nameDiv.textContent = `${Contents.firstName[0]} ${Contents.lastName[0]}`;
                nameDiv.style.fontSize = '30px';
                nameDiv.style.color = '#0a0000';
                nameDiv.style.display = 'flex';
                nameDiv.style.justifyContent = 'center';
                nameDiv.style.alignItems = 'center';
                nameDiv.style.height = '120px'; 
                nameDiv.style.width = '120px'; 
                nameDiv.style.borderRadius = '50%'; 
                nameDiv.style.backgroundColor = 'aliceblue';
            }

    
        liCard.appendChild(nameDiv);
    }

   
    const liTitle = document.createElement('h2');
    liTitle.classList.add('actor-title');
    liTitle.textContent = `${Contents.firstName} ${Contents.lastName}`;

    liCard.appendChild(liTitle);

    const ulListSocialNetworks = document.createElement('ul');
    ulListSocialNetworks.classList.add('social-networks');

    for (const contact of Contents.contacts) {
        const contactLoaded = await CheckLoad(contact);
        
        if (contactLoaded) {
            const liSocial = document.createElement('li');

            const divCircle = document.createElement('div');
            divCircle.classList.add('circle');
    
            const linkDivCircle = document.createElement('a');
            linkDivCircle.href = contact;
    
            const iconSocial = document.createElement('img');
    
            if (contact.includes('facebook')) {
                iconSocial.src = "fb.png";
                iconSocial.alt = "facebook";
            } else if (contact.includes('twitter')) {
                iconSocial.src = "tw.png";
                iconSocial.alt = "twitter";
            } else if (contact.includes('instagram')) {
                iconSocial.src = "ins.png";
                iconSocial.alt = "instagram";
            }
            iconSocial.classList.add('fb');

            linkDivCircle.appendChild(iconSocial);
            divCircle.appendChild(linkDivCircle);
            liSocial.appendChild(divCircle);
            ulListSocialNetworks.appendChild(liSocial);
        }
    }

    liCard.appendChild(ulListSocialNetworks);

    liCard.addEventListener('click', () => {
        const cardClick = document.querySelector('.text-class');
        cardClick.style.fontSize = '15px';
        cardClick.style.letterSpacing = '0.1em';
        cardClick.style.color = '#b83333';
        let str = `${Contents.firstName} ${Contents.lastName}`;
        str += '   ';

        if (!cardClick.textContent.includes(str)) {
            cardClick.textContent += str;
        }
    });

    liCard.addEventListener('dblclick', () => {
        const cardClick = document.querySelector('.text-class');
        let str = `${Contents.firstName} ${Contents.lastName}`;
        str += '   ';

        if (cardClick.textContent.includes(str)) {
            cardClick.textContent = cardClick.textContent.replace(str, '');
        }
    });

    return liCard;
}

const ulContainer = document.querySelector('.container');

async function loadCards() {
    for (const element of cardContents) {
        const cardContent = await createCard(element);
        ulContainer.appendChild(cardContent);
    }
}

loadCards();
