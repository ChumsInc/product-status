<?php
/**
 * @package Chums Inc
 * @subpackage Imprint Status
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2011, steve
 */
use chums\ui\WebUI2;
use chums\user\Groups;
use chums\ui\JSOptions;
use chums\ui\CSSOptions;

require_once ("autoload.inc.php");

$ui = new WebUI2([
    'title' => 'Product Status',
    'bodyClassName' => 'container-fluid',
    'requiredRoles' => [Groups::SALES],
]);
$ui->addCSS('public/css/styles.css', CSSOptions::parse(['useTimestampVersion' => true]))
    ->addManifestJSON('public/js/manifest.json')
    ->render();
