(function () { 
    /**
     * Временная подгрузка товаров из Avito
     */

    const apiUrl = 'https://www.avito.ru/web/1/main/items?forceLocation=false&locationId=621585&lastStamp=1692542448&limit=30&offset=60&categoryId=1';
    const $cardTemplate = document.querySelector('.card').cloneNode(true);
    const $cardsContainer = document.querySelector('.cards');

    fetch(apiUrl)
        .then(function (response) { // Преобразовываем ответ в JSON
            return response.json();
        })
        .then(function (data) { // Работа с преобразованными данными
            document.querySelectorAll('.card').forEach(function ($card) {
                $card.remove();
            });

            data.items.forEach(function (item) {
                addCatalogItemCard(item);
            });
        });

    function addCatalogItemCard (item) {
        const $cardItem = $cardTemplate.cloneNode(true);
        const publishedAt = new Date(item.sortTimeStamp * 1000);
        const publishedHours = publishedAt.getHours() < 10 ? "0" + publishedAt.getHours() : publishedAt.getHours();
        const publishedMinutes = publishedAt.getMinutes() < 10 ? "0" + publishedAt.getMinutes() : publishedAt.getMinutes();

        $cardItem.querySelector('.card-name').textContent = item.title;
        $cardItem.querySelector('.card-price').textContent = item.priceDetailed.string + ' ₽';
        $cardItem.querySelector('.card-address').textContent = item.location.name;
        $cardItem.querySelector('.card-published').textContent = `Сегодня ${publishedHours}:${publishedMinutes}`;
        $cardItem.querySelector('.card-img').setAttribute("src", item.images[0]["432x324"]);
        $cardItem.querySelector('.card-img').setAttribute("alt", item.imagesAlt);

        $cardsContainer.appendChild($cardItem);
    }
})();