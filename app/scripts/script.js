
(function(){
	/*выпадающий список*/
let topicChoose = document.querySelector('.content_form-topic-set');
let topicList = document.querySelector('.content_form-list');
let formTopic = document.querySelector('input[name="topic"]');
let formTopicItems = document.querySelectorAll('.content_form-list li');

/*фома*/
let formFeedback = document.querySelector('.content_form form');

/*все инпуты*/
let formInputs = Array.from(document.querySelectorAll('.content_form input'));
let formTextArrea = Array.from(document.querySelectorAll('.content_form textarea'));
let formFields = formInputs.concat(formTextArrea);


topicChoose.addEventListener('mouseover', function() {
	topicList.classList.remove('hide-list');
	topicList.classList.add('active-list');
});

topicChoose.addEventListener('mouseout', function() {
	topicList.classList.add('hide-list');
	topicList.classList.remove('active-list');
});

for (let i = 0; i < formTopicItems.length; i++) {
	formTopicItems[i].addEventListener('click', function() {
		let val = formTopicItems[i].innerHTML;
		formTopic.value = val;
		topicList.classList.add('hide-list');
	})
};


function validate(reg, data) {
    if (new RegExp(reg).test(data)) {
        return true;
    }
    return false;
};

/*пробегаем по всем инпутам, проверяем наличие 
в них каких-либо значений и если задано регулярное 
выражение проводим валидацию в соответствии с ним
добавляем красный бордер, если значение не подхоит или не введено*/
function formValidation() {
	let countRifhtFields = 0;
    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].value) {
        	let reg = formFields[i].getAttribute('data-regx');
            if (reg && !validate(reg, formFields[i].value)) {
                formFields[i].style.border = '1px solid red';
                continue;
            }
            formFields[i].style.border = 'none';
            countRifhtFields++;
        }
        else formFields[i].style.border = '1px solid red';
    }
    return countRifhtFields;
};




formFeedback.addEventListener('change', function() {
	formValidation();
});


formFeedback.addEventListener('submit', function(e) {
	e.preventDefault();
	if (formValidation() == formFields.length) {
		formFeedback.submit()
	}
	return
});
})();