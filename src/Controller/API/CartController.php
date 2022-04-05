<?php

namespace App\Controller\API;

use App\Entity\CartItem;
use App\Repository\CartItemRepository;
use App\Repository\ProductRepository;
use App\Service\SessionCartService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CartController extends AbstractController {

    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em) {
        $this->em = $em;
    }

    #[Route('/api/cart', name: 'api_cart', methods: ['GET'])]
    public function index(SessionCartService $sessionCartService): JsonResponse {
        return $this->json(
            $sessionCartService->getCart(),
        );
    }

    #[Route('/api/cart/add', name: 'api_cart_add', methods: ['POST'])]
    public function addToCart(Request $request, ProductRepository $productRepository, SessionCartService $sessionCartService): JsonResponse {
        $payload = json_decode($request->getContent(), true);
        if (!isset($payload['product_id']) || !isset($payload['quantity'])) {
            return $this->returnError('Missing parameters');
        }

        $product = $productRepository->find((int)$payload['product_id']);
        $quantity = (int)$payload['quantity'];

        if (null === $product) {
            return $this->returnError('Le produit machin cassé');
        }

        $cart = $sessionCartService->getCart();
        $cartItem = $cart->getCartItem($product);

        if (null === $cartItem && $quantity === 1) {
            if ($product->getStock() > 0) {
                $cartItem = (new CartItem())
                    ->setProduct($product)
                    ->setCart($cart)
                    ->setQuantity(1)
                ;
            }
            else $this->returnError("Y'a pas de stock");

        }

        elseif ($cartItem && $cartItem->getQuantity() + $quantity <= 0) {
            $this->em->remove($cartItem);
            $this->em->flush();
            $this->em->refresh($cart);

            return $this->json($cart);
        }

        elseif ($cartItem && $cartItem->getQuantity() + $quantity > $product->getStock()) {
            return $this->returnError('Le stock ne permet pas machin');
        }

        elseif ($cartItem && $cartItem->getQuantity() + $quantity > 0) {
            $cartItem->setQuantity($cartItem->getQuantity() + $quantity);
        }

        else {
            return $this->returnError('impossible');
        }

        if ($cartItem) {
            $this->em->persist($cartItem);
            $this->em->flush();

            $this->em->refresh($cart);
        }
        return $this->json($cart);
    }

    private function returnError(string $errorMessage): JsonResponse {
        return $this->json([
            'error' => true,
            'message' => $errorMessage,
        ]);
    }

    #[Route('/api/cart/one-del', name: 'api_cart_one_del', methods: ['POST'])]
    public function delOne(Request $request, CartItemRepository $cartItemRepository): JsonResponse {
        $payload = json_decode($request->getContent(), true);
        if (!isset($payload['id'])) {
            return $this->returnError('Missing parameters');
        }

        $cartItem = $cartItemRepository->find((int)$payload['id']);
        $this->em->remove($cartItem);
        $this->em->flush();
        return $this->json($cartItem);
    }

    #[Route('/api/cart/del', name: 'api_cart_del', methods: ['POST'])]
    public function del(Request $request, CartItemRepository $cartItemRepository): JsonResponse {
        $payload = json_decode($request->getContent(), true);
        if (!isset($payload['cartItems'])) {
            return $this->returnError('Missing parameters');
        }

        $cartItems = $cartItemRepository->findAll();
        foreach ($cartItems as $cartItem) {
            $this->em->remove($cartItem);
        }
        $this->em->flush();
        return $this->json($cartItems);
    }

}
