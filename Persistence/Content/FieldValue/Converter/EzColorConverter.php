<?php

namespace Simplelogica\EzColorFieldBundle\Persistence\Content\FieldValue\Converter;

use eZ\Publish\Core\Persistence\Legacy\Content\FieldValue\Converter;
use eZ\Publish\Core\Persistence\Legacy\Content\StorageFieldValue;
use eZ\Publish\SPI\Persistence\Content\FieldValue;
use eZ\Publish\SPI\Persistence\Content\Type\FieldDefinition;
use eZ\Publish\Core\Persistence\Legacy\Content\StorageFieldDefinition;

class EzColorConverter implements Converter
{
    public static function create()
    {
        return new self();
    }

    public function toStorageValue(FieldValue $value, StorageFieldValue $storageFieldValue)
    {
        $storageFieldValue->dataText = $value->data;
        $storageFieldValue->sortKeyString = $value->sortKey;
    }

    public function toFieldValue(StorageFieldValue $value, FieldValue $fieldValue)
    {
        $fieldValue->data = $value->dataText;
        $fieldValue->sortKey = $value->sortKeyString;
    }

    public function toStorageFieldDefinition(FieldDefinition $fieldDef, StorageFieldDefinition $storageDef)
    {
        $storageDef->dataText1 = $fieldDef->defaultValue->data;
    }

    public function toFieldDefinition(StorageFieldDefinition $storageDef, FieldDefinition $fieldDef)
    {
        $validatorConstraints = array();

        $fieldDef->fieldTypeConstraints->validators = $validatorConstraints;
        $fieldDef->defaultValue->data = $storageDef->dataText1 ?: null;
        $fieldDef->defaultValue->sortKey = $storageDef->dataText1 ?: '';
    }

    public function getIndexColumn()
    {
        return 'sort_key_string';
    }
}
