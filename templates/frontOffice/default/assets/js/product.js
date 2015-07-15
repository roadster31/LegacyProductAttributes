(function ($) {
    var $insert = $('#form-product-details-legacy-product-attributes');
    var $formProductDetails = $('#form-product-details');

    if ($insert.length) {
        $formProductDetails
            .find('fieldset:eq(-0)')
            .before($insert.html());
    }

    function setLegacyProductAttributesPrices($promo, $old) {
        console.log('-');

        $
            .ajax({
                type: 'POST',
                url: '{url path="/admin/module/LegacyProductAttributes/product/get_prices"}',
                data: $formProductDetails.serialize()
            })
            .done(function (data) {
                if (typeof data.promo_price != 'undefined') {
                    $promo.html(data.promo_price);
                    $old.html(data.price);
                } else {
                    $promo.html(data.price);
                }
            })
            .fail(function () {
                $promo.html('-');
                $old.html('-');
            });
    }

    $formProductDetails.on('change', '.pse-option', function () {
        setLegacyProductAttributesPrices( $('#pse-price'), $('#pse-price-old'));
    });

    $(document).ajaxSuccess(function (event, xhr, settings) {
        // addCartMessageUrl is initialized in layout.tpl
        if (settings.url.split(/[?#]/)[0] != addCartMessageUrl) {
            return;
        }

        $bootbox = $('.bootbox');

        setLegacyProductAttributesPrices(
            $bootbox.find('.special-price').find('.price'),
            $bootbox.find('.old-price').find('.price')
        );
    });
})(jQuery);