<?php
/**
 * @package Chums Inc
 * @subpackage Imprint Status
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2011, steve
 */

require_once ("autoload.inc.php");
require_once ("access.inc.php");

enable_error_reporting(true);

$bodyPath = "/apps/product-status";
$title = "Product Status";

$ui = new WebUI($bodyPath, $title, '', true, true);
$ui->version = "2017.02.08.1331";
$ui->setBodyClass('container-fluid');

$ui->AddCSS('public/css/styles.css');
$ui->addManifest('public/js/manifest.json');
$ui->Send();
