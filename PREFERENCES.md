
# Aged Mineswapper

__Задачка__:
Реализовать приложение-игру "Сапёр" ([ссыль1](https://сапёронлайн.рф/#beginner-150-night), [ссыль2](https://сапёр.com/)). Ну да. Ты её наверняка знаешь, поэтому я решил тут правила не расписывать. Вижу два варианта:
1. если интересно, можешь всё вспомнить/вывести самостоятельно;
2. если не охота тратить время, то вот [тут](https://github.com/PoliceAmunice/tasks-sapper/blob/master/GAME_DETAILS.md) лежит `.md` со всем, что вывел я.

Это было про тему, на примере которой будем тыкать JS. Дальше буду описывать те самые "категории", но сперва уточню, чтобы легче было читать сам список: стадии развития JS можно условно поделить пополам на "до ES6" и "после ES6". [ES6](https://newwebmaster.ru/es5-es6-what-is-it/) это обновление, в которое было включено [множество](https://habr.com/en/post/305900/) очень полезных расширений синтаксиса/языка. Важно знать актуальные возможности, но неплохо понимать и основу. Поэтому далее будут встречаться довольно противоречивые пожелания, типа "пиши по-новому, но тут пиши по-старому".

## Основное
Список пожеланий непосредственно к самому коду:
* \* __без использования [вендорных библиотек](https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA)__ – это учебный проект, так что самое время писать велосипеды. Но если очень хочется подключить Bootstrap, [Tailwind](https://tailwindcss.com/) или ещё чего для вёрстки, то это другое дело;
* \* __нативное [ПОП](https://developer.mozilla.org/ru/docs/Glossary/Prototype-based_programming) без "сахара"__ – в JS ООП реализовано специфически, через прототипы (прототипно ориентированное П). С появлением ES6 стал доступен "синтаксический сахар", который выглядит, как классическое ООП (`class, extends, get/set, ..`), но под капотом там всё те же прототипы. Поэтому важно с ними ознакомиться (начать можно [отсюда](https://learn.javascript.ru/prototype-inheritance));
* \* __современные методы [примитивов](https://learn.javascript.ru/primitives-methods) вместо классических конструкций__ – чтобы лучше понять вкусности всех этих "ES6+", стоит избегать классического `for (i..i++)` в пользу `string.forEach()`, `array.map()` и подобного. По ссылке выше можно всех посмотреть, но там много.. Предлагаю поглядывать туда при случае;
* __типизация с помощью [JSDoc](https://jsdoc.app/)__ – мы пишем проект на нативном JS, у которого нет собственных возможностей для типизации, но типизация очень важна (избегание ошибок, подсказки от IDE). В современных реалиях эту проблему решают через "надстройку", [TypeScript](https://www.typescriptlang.org/), но нам пока не до этого. Поэтому предлагаю разобраться с JSDoc. Он проще и может пригодиться когда-нибудь (синтаксис похож на аналогичное у php, например);
* __соблюдение единого стиля оформления кода__ (лучше в соответствии с общими договорённостями, например [от Airbnb](https://airbnb.io/javascript/)) – просто важный навык. Да, сейчас и этот момент автоматизируют через [линтеры](https://thecode.media/linter/), но такие не всегда есть под рукой. К большинству проектов, с которыми я имел дело, линтер прикручен не был. Некоторые из них были похожи на помойку (в том числе из-за этого, кек);
* __один файл для скриптов__ (`src/script.js`) – очень необязательный момент. Предлагаю только для того, чтобы ознакомиться с портянками кода, которые могут встретиться в старых проектах. В любом случае, если вместо этого решишь бить код по файлам, там тоже будут интересные нюансы, так что – как больше хочется.

## Архитектура
Громкий заголовок, учитывая размеры проекта, но всё же кое-что интересное можно попробовать. Ссылок тут будет значительно меньше, тк одной ссылкой не обойтись. Потенциально, любой пункт ниже – повод для созвона, более или менее.
Погнали:
* __монтирование всего приложения в единственный элемент__ (`div#root`, пример [тут](https://github.com/PoliceAmunice/tasks-sapper/blob/master/index.html)) – в современных веб-приложениях, написанных на современных фреймворках, это считается нормой, когда в `index.html` почти нет вёрстки. Вместо этого, всё [DOM-дерево](https://learn.javascript.ru/dom-nodes) рисуется через JS с помощью [нативных методов](https://learn.javascript.ru/modifying-document), типа `document.createElement()` (фреймворки это просто абстрагируют). Для забавы, можно упороться и замутить то же самое. Это не так сложно, но чтобы проект не превратился в запутанную срань я рекомендую следующий пункт;
* __реализация одного из архитектурных шаблонов по разделению ответственности между частями модуля__ (MVC, MVP, MVVM) – довольно сложная тема, если не сталкивался. Делать MVVM в полном виде – хватит на отдельную задачу, тк в конце ты получишь новый фреймворк, но с MVC/MVP справиться можно. Просто напиши, если интересно, и я тебе лучше сам расскажу, а там уже и ссылок подкину по реализации;
* __взаимодействие модулей через [Шину событий](https://medium.com/nuances-of-programming/%D1%80%D1%83%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE-%D0%BF%D0%BE-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D1%8E-%D0%BF%D0%B0%D1%82%D1%82%D0%B5%D1%80%D0%BD%D0%B0-event-bus-%D0%B2-%D0%B0%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B5-react-c96e6ae55c78)__ (пишут про React, но основу объясняют) – возможно в процессе у тебя появятся слабосвязанные модули (это хорошо), которые при этом должны взаимодействовать друг с другом (например, уменьшить счётчик флажков в инф. панели при использовании одного на поле). Вместо того, чтобы пробрасывать общее значение в обоих (тем самым усиливая их связанность), можно использовать вот такой паттерн. Идея простая, [реализация](https://youtu.be/T3lLS5yGTFE?t=324) тоже.

## Фичи
Основных "фич" игры вполне достаточно, но если захочется чего-то сверху, то можно так:
* __"шаг назад" хоть до самого начала игры__ – просто интересная подзадачка, встречается не во всех экземплярах игры;
* __сохранение статистики игрока (победы/поражения) после закрытия браузера__ – да, просто добавить счётчик не так весело. Эта фича больше про сохранение/распознавание пользователя и хранение его статистики где-нибудь в [локальных хранилищах](https://learn.javascript.ru/data-storage).

Я сам пилю всё то же самое прямо сейчас, параллельно поправляя этот файлик, так что интересные предложения по функционалу приветствуются :)

## UI (User Interface)
Всё про сохранение исконной стилистики игры:
* __цвета, шрифт, иконки и прочее__ – с нуля это воспроизводить довольно гемморно, но мне повезло найти [готовых проект](https://www.figma.com/file/lJG79raMLPPRKDwQOXK7qr/Windows-95-Design-System-(Community)?node-id=0%3A1&t=Uyf8308JJzlcEsvd-0) на Фигме. Если не знаком, Figma – это очень мощный инструмент для проектирования пользовательских интерфейсов. Сообщество там просто огромное. Так же, как программисты пиздят код с Githab, дизайнеры могут "вдохновляться" чужим из Фигмы. Фронтендерам с этим инструментом быть знакомым тоже не повредит, тк "макеты". В общем, если захочется – говори, покажу;
* __счётчики из оригинальной игры__ – да-да, вот эти квадратные циферки. По-факту, этот пункт можно описать и в разделе Фич, тк логика изменения сегментов – весёлая задачка.

## Вот и всё!
Текста много, за это прошу пардона. Можно было написать это ёмче, но я больше старался сохранять ясность, да и торопился слегка. В любом случае, ты дочитал до сюда, а значит уже molodoy cowboy. Осталось только немного накодить.

# FAQ
Отвечаю на свои же вопросы:
* __какого хрена Сапёр, а не TODO-лист какой-нибудь?__ – потому что в этой игре логики больше, чем вёрстки (если не упарываться, конечно);
* __это первая задача? Какого хрена? А сколько будет?__ – до конца ещё не определился, но следующие несколько идей всё равно будут крутиться вокруг того, что получится после первой и речь там будет уже меньше про JS, больше про "вспомогательные" технологии. Но и классическое веб-приложение, вроде Тудушки, тоже планируется, но попозже (если доживём);
* __заебал! Почему так много?!__ – конечно, если что-то кажется сложным/скучным/не тем, на что хочется тратить время, то можно пропустить. В этой задачке я пытался не столько уменьшить количество информации, сколько привязать её к контексту, чтобы было понятно что/где/как применяется. Надеюсь, получилось неплохо;
* __архитектура-хуетиктура, заебал!__ – конкретно эту категорию я очень сомневался включать, тк уже похоже на "тумач", но решил, что лучше вкинуть, вдруг заинтересует.
