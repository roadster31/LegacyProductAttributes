(function($) {
    function switchLegacyAttributesPriceFields(withTaxes) {
        var $legacyAttributesPrices = $('.legacy-attributes-price');
        var $legacyAttributesPricesWithoutTax = $legacyAttributesPrices.filter('.without-tax');
        var $legacyAttributesPricesWithTax = $legacyAttributesPrices.filter('.with-tax');

        if (withTaxes) {
            $legacyAttributesPricesWithoutTax.hide();
            $legacyAttributesPricesWithTax.show();
        } else {
            $legacyAttributesPricesWithTax.hide();
            $legacyAttributesPricesWithoutTax.show();
        }
    }

    var $usePriceWithTaxSwitch = $('#use_prices_with_tax');

    switchLegacyAttributesPriceFields($usePriceWithTaxSwitch.prop('checked'));

    $usePriceWithTaxSwitch.change(function() {
        switchLegacyAttributesPriceFields($(this).prop('checked'));
    });
})(jQuery);
