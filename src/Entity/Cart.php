<?php

namespace App\Entity;

use App\Repository\CartRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CartRepository::class)]
class Cart {

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\OneToMany(mappedBy: 'cart', targetEntity: CartItem::class, cascade: ['persist'], orphanRemoval: true)]
    private $cartItems;

    public function __construct() {
        $this->cartItems = new ArrayCollection();
    }

    public function getId(): ?int {
        return $this->id;
    }

    /**
     * @return Collection<int, CartItem>
     */
    public function getCartItems(): Collection {
        return $this->cartItems;
    }

    public function getCartItem(Product $product): ?CartItem {
        foreach ($this->getCartItems() as $cartItem) {
            if ($cartItem->getProduct()->getId() === $product->getId()) {
                return $cartItem;
            }
        }
        return null;
    }

    public function addCartItem(CartItem $cartItem): self {
        if (!$this->cartItems->contains($cartItem)) {
            $this->cartItems[] = $cartItem;
            $cartItem->setCart($this);
        }

        return $this;
    }

    public function removeCartItem(CartItem $cartItem): self {
        if ($this->cartItems->removeElement($cartItem)) {
            // set the owning side to null (unless already changed)
            if ($cartItem->getCart() === $this) {
                $cartItem->setCart(null);
            }
        }

        return $this;
    }
}
