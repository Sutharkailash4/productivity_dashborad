let box = document.querySelectorAll('.list');
let big_box = document.querySelectorAll('.hide');
let back_button = document.querySelectorAll('.back_btn');
let one = document.querySelector('.one');

box.forEach((value) => {
    value.addEventListener('click', () => {
        one.style.display = 'none';
        big_box[value.id].style.display = 'block';
    })
})

back_button.forEach((value) => {
    value.addEventListener('click', () => {
        big_box[value.id].style.display = 'none';
        one.style.display = 'block';
    })
})

// todo list

let todo_input = document.querySelector('.todo_input');
let todo_textarea = document.querySelector('textarea');
let check_todo = document.querySelector('#check');
let add_task_btn = document.querySelector('.add_btn');
let output_main_box = document.querySelector('.todo_output');

let add_task = () => {
    let input_value = todo_input.value;
    if (input_value.trim() === "") {
        window.alert("Please Fill Input");
    } else {
        let output_inner_box = document.createElement('div');
        output_inner_box.className = "task_box";
        let h2 = document.createElement('h4');
        let remove_button = document.createElement('button');
        let important_button = document.createElement('button');
        let task_button = document.createElement('div');
        let span = document.createElement('span');
        span.innerHTML = 'Important';
        task_button.className = 'task_btn';
        remove_button.className = 'remove_btn';
        important_button.className = 'important_btn';
        task_button.appendChild(remove_button);
        task_button.appendChild(important_button);
        h2.innerHTML = input_value;
        remove_button.innerHTML = "Remove";
        important_button.innerHTML = "Mark as important";
        output_inner_box.appendChild(h2);
        output_inner_box.appendChild(task_button);
        output_main_box.appendChild(output_inner_box);
        todo_input.value = "";
        todo_textarea.value = "";

        if (check_todo.checked === true) {
            h2.appendChild(span);
        }

        remove_button.addEventListener('click', () => {
            output_inner_box.remove();
        })

        important_button.addEventListener('click', () => {
            if (!check_todo.checked) {
                h2.appendChild(span);
            }
        })

        check_todo.checked = false;
    }
}
add_task_btn.addEventListener('click', add_task);

// daily planner

let daily_planner_big_box = document.querySelector('.daily_planner_main_box');

let arr = [
    '6:00-7:00',
    '7:00-8:00',
    '8:00-9:00',
    '9:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-1:00',
    '1:00-2:00',
    '2:00-3:00',
    '3:00-4:00'
];

let sum = "";

arr.forEach((value) => {
    sum += ` <div class="daily_planner_box">
                <p class="planner_time">${value}</p>
                <input type="text" class="daily_planner_input" placeholder="..." spellcheck=false>
                <button class="done">Done</button>
            </div> `
})

daily_planner_big_box.innerHTML = sum;
let done_buttons = document.querySelectorAll('.done');
let daily_planner_input = document.querySelectorAll('.daily_planner_input');

done_buttons.forEach((value, idx) => {
    value.addEventListener('click', () => {
        daily_planner_input[idx].value = "";
    })
})

// Motivation Quotes

let quote = document.querySelector('.quote');
let author = document.querySelector('.author_name_box');
let change_btn = document.querySelector('.change_quote');

function getQuote() {

    let api = fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
            'X-Api-Key': 'WCLPRfFD20HDzwD8XL5qgA==NGxwo9MpkWnAADpS'
        }
    })

    api.then((val) => {
        return val.json();
    }).then((value) => {
        quote.innerHTML = value[0].quote;
        author.innerHTML = value[0].author;
    })
}

getQuote();

change_btn.addEventListener('click', () => {
    change_btn.disabled = true;
    getQuote();
    setTimeout(() => {
        change_btn.disabled = false;
    }, 2000);
})

// pomodoro Timer

let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');

let start_btn = document.querySelector('.start_btn');
let stop_btn = document.querySelector('.stop_btn');
let reset_btn = document.querySelector('.reset_btn');

stop_btn.disabled = true;
reset_btn.disabled = true;

let min = 25;
let sec = 0;
let interval = null;

minutes.innerHTML = min;
seconds.innerHTML = "00";

let start = () => {
    start_btn.disabled = true;
    stop_btn.disabled = false;
    reset_btn.disabled = false;

    interval = setInterval(() => {

        if (min === 0 && sec === 0) {
            clearInterval(interval);
            start_btn.disabled = false;
            stop_btn.disabled = true;
            reset_btn.disabled = true;

            min = 25;
            sec = 0;
            minutes.innerHTML = min;
            seconds.innerHTML = "00";
            return;
        }

        if (sec === 0) {
            min--;
            sec = 59;
        } else {
            sec--;
        }

        minutes.innerHTML = min;
        seconds.innerHTML = sec < 10 ? "0" + sec : sec;

    }, 1000);
};

start_btn.addEventListener('click', start);

stop_btn.addEventListener('click', () => {
    clearInterval(interval);
    start_btn.disabled = false;
});

reset_btn.addEventListener('click', () => {
    clearInterval(interval);
    min = 25;
    sec = 0;

    minutes.innerHTML = min;
    seconds.innerHTML = "00";

    start_btn.disabled = false;
    stop_btn.disabled = true;
    reset_btn.disabled = true;
});

// weather

let temp = document.querySelector('.first_box h2');
let cloud = document.querySelector('.first_box h3')
let humidity = document.querySelector('.humidity');
let sunrise = document.querySelector('.sunrise');
let sunset = document.querySelector('.sunset');
let wind = document.querySelector('.wind');

let getData = async (city) => {
    try {
        let api_key = 'd7523231a7f73afa5a25359a057887d6';
        let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`);
        let data = await api.json();
        console.log(data);
        temp.innerHTML = data.main.temp + "°C";
        cloud.innerHTML = data.weather[0].description;
        humidity.innerHTML = `Humadity : ${data.main.humidity}`;
        let sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        sunrise.innerHTML = `Sunrise : ${sunriseTime}`;
        let sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        sunset.innerHTML = `Sunset : ${sunsetTime}`;
        wind.innerHTML = `Wind : ${data.wind.speed}`;
    } catch {
        console.log("Some thing went wrong");
    }
}

getData("Jalore");

// getData("bhopal");
let Time = document.querySelector('.time');
let u_time = document.querySelector('.upper');
let city_name = document.querySelector('.city_name');

let weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let getTime = () => {
    let date = new Date();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let day = date.getDay();
    let time = date.toDateString();

    let ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;

    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    let day_name = weeks[day];

    u_time.innerHTML = time;
    Time.innerHTML = `${day_name} , ${hour} : ${minute} : ${second} ${ampm}`;
    city_name.innerHTML = 'Jalore (RJ)';
};

setInterval(getTime, 1000);

getTime();

//change theme

let root = document.documentElement;

let isDark = false;

let theme = () => {
    if (!isDark) {
        root.style.setProperty('--primary-color', '#1e1e1e');
        root.style.setProperty('--secondary-color', '#49334e');
        isDark = true;
    } else {
        root.style.setProperty('--primary-color', '#7a4f15');
        root.style.setProperty('--secondary-color', '#66581c');
        isDark = false;
    }
};

let change_theme_button = document.querySelector('.nav_btn');
change_theme_button.addEventListener('click', theme);

// daily goals

let goal_input = document.querySelector('.goal_input');
let add_goal_btn = document.querySelector('.add_goal_btn');
let goals_output_box = document.querySelector('.goals_output_box');

add_goal_btn.addEventListener('click', () => {
    let goalText = goal_input.value.trim();

    if (goalText === "") {
        alert("Please enter a goal");
        return;
    }

    let goal_item = document.createElement('div');
    goal_item.className = 'goal_item';

    let goal_name = document.createElement('span');
    goal_name.innerText = goalText;

    let btn_box = document.createElement('div');
    btn_box.className = 'goal_buttons';

    let done_btn = document.createElement('button');
    done_btn.innerText = 'Done';
    done_btn.className = 'goal_done';

    let delete_btn = document.createElement('button');
    delete_btn.innerText = 'Delete';
    delete_btn.className = 'goal_delete';

    btn_box.appendChild(done_btn);
    btn_box.appendChild(delete_btn);

    goal_item.appendChild(goal_name);
    goal_item.appendChild(btn_box);

    goals_output_box.appendChild(goal_item);

    goal_input.value = "";

    done_btn.addEventListener('click', () => {
        goal_item.classList.toggle('completed');
    });

    delete_btn.addEventListener('click', () => {
        goal_item.remove();
    });
});
