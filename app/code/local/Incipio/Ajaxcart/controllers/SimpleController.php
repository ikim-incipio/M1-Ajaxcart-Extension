<?php
require_once 'Mage/Checkout/controllers/CartController.php';
class Incipio_Ajaxcart_SimpleController extends Mage_Checkout_CartController
{
	public function indexAction()
	{
        $params = $this->getRequest()->getParams();

        if ($params['isAjax']==1){
        	$response = array();
        	$product = Mage::getModel('catalog/product')->load($params['product']);

        	if (!$product){
        		$response['status'] = 'ERROR';
        		$response['message'] = 'Unable to find matching product';
        	}

	        $attr = explode(':', $params['super_attribute']);
	        $options[$attr[0]] = $attr[1];

	        $cart = Mage::getSingleton('checkout/cart');
	        $cart->init();

	        $additional = array(
	        	'product' => $params['product'],
	        	'qty' => $params['qty'],
	        );

	        try {
	        	$request = new Varien_Object();
	        	$request->setData($additional);
		        $cart->addProduct($product, $request);
		        $session = Mage::getSingleton('customer/session');
		        $session->setCartWasUpdated(true);
		        $cart->save();

			    if (!$cart->getQuote()->getHasError()){
		        	$response['status'] = 'SUCCESS';
		        	$response['message'] = 'Product was added to cart successfully';

		        	Mage::getSingleton('core/session', array('name'=>'frontend'));
					$session = Mage::getSingleton('customer/session', array('name'=>'frontend'));
					$layout = Mage::app()->getLayout();
					$layout->getUpdate()->addHandle('default')->load();
					$layout->generateXml()->generateBlocks();
					$toplinks = $layout->getBlock('top.links')->toHtml();
					$minicart = $layout->getBlock('minicart_head')->toHtml();
					$response['toplinks'] = $toplinks;
					$response['minicart'] = $minicart;
		        }
		    } catch (Exception $e){
		    	$response['status'] = 'ERROR';
        		$response['message'] = $e->getMessage();
		    }

		    $this->getResponse()->setBody(Mage::helper('core')->jsonEncode($response));
	        
	        return;
        } else {
        	return;
        }
	}
}