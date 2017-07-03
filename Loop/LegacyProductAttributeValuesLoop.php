<?php

namespace LegacyProductAttributes\Loop;

use LegacyProductAttributes\Model\Map\LegacyProductAttributeValueTableMap;
use Propel\Runtime\ActiveQuery\Criteria;
use Thelia\Core\Template\Element\LoopResult;
use Thelia\Core\Template\Loop\Argument\Argument;
use Thelia\Core\Template\Loop\AttributeAvailability;
use Thelia\Model\ConfigQuery;
use Thelia\Model\Map\AttributeAvTableMap;

/**
 * Class LegacyProductAttributeValuesLoop
 * @package LegacyProductAttributes\Loop
 * @method getProductId()
 */
class LegacyProductAttributeValuesLoop extends AttributeAvailability
{
    protected function getArgDefinitions()
    {
        $args = parent::getArgDefinitions();

        $args->addArgument(Argument::createIntTypeArgument('product_id'));

        return $args;
    }

    public function buildModelCriteria()
    {
        $checkAvailableStock = ConfigQuery::checkAvailableStock();

        $query = parent::buildModelCriteria();

        $query
            ->addJoin(AttributeAvTableMap::ID, LegacyProductAttributeValueTableMap::ATTRIBUTE_AV_ID)
            ->add(LegacyProductAttributeValueTableMap::VISIBLE, true)
            ->add(LegacyProductAttributeValueTableMap::PRODUCT_ID, $this->getProductId())
        ;

        // Hide items without stock
        if ($checkAvailableStock) {
            $query
                ->add(LegacyProductAttributeValueTableMap::STOCK, 0, Criteria::GREATER_THAN);
        }

        return $query;
    }

    public function parseResults(LoopResult $loopResult)
    {
        return parent::parseResults($loopResult); // TODO: Change the autogenerated stub
    }


}
