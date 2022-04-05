<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use App\Repository\CategoryRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture {
    private CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository) {
        $this->categoryRepository = $categoryRepository;
    }

    public function load(ObjectManager $manager): void {
        foreach (['Software', 'Hardware', 'Autres'] as $categoryName) {
            $category = (new Category())->setName($categoryName);
            $manager->persist($category);
        }

        $manager->flush();

        $cat1 = $this->categoryRepository->find(19);
        $cat2 = $this->categoryRepository->find(20);
        $cat3 = $this->categoryRepository->find(21);
        $products = [
            (new Product())
                ->setName("Ecran")
                ->setCategory($cat2)
                ->setPrice(150)
                ->setDescription("description: lorem ipsum truc ecran")
                ->setStock(98)
                ->setImage('image1.png')
            ,
            (new Product())
                ->setName("Pc portable")
                ->setCategory($cat2)
                ->setPrice(123)
                ->setDescription("description: lorem ipsum truc pc portable")
                ->setStock(12)
                ->setImage('image2.png')
            ,
            (new Product())
                ->setName("Microsoft Office Word")
                ->setCategory($cat1)
                ->setPrice(15478)
                ->setDescription("description: machin pour ecrire")
                ->setStock(1)
                ->setImage('image3.png')
            ,
            (new Product())
                ->setName("Table")
                ->setCategory($cat3)
                ->setPrice(12)
                ->setDescription("description: table en bois, elle est toute petite")
                ->setStock(914)
                ->setImage('image4.png')
            ,
            (new Product())
                ->setName("Disque dur")
                ->setCategory($cat2)
                ->setPrice(456)
                ->setDescription("description: lorem ipsum truc memoir")
                ->setStock(861)
                ->setImage('image5.png')
            ,
            (new Product())
                ->setName("*nom logiciel super connu*")
                ->setCategory($cat1)
                ->setPrice(0)
                ->setDescription("description: meilleur logiciel au monde")
                ->setStock(12358)
                ->setImage('image1.png')
            ,
            (new Product())
                ->setName("Biscuit")
                ->setCategory($cat3)
                ->setPrice(748)
                ->setDescription("description: meilleur biscuit d'espagne")
                ->setStock(6)
                ->setImage('image3.png')
            ,
            (new Product())
                ->setName("Telephone")
                ->setCategory($cat2)
                ->setPrice(632)
                ->setDescription("description: il est cassé et beacoup trop chere (mais il est joli)")
                ->setStock(58)
                ->setImage('image2.png')
            ,
        ];

        array_map(fn($product) => $manager->persist($product), $products);
        $manager->flush();
    }
}
