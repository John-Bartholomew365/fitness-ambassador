"use client"

import { useState } from 'react'
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

type Product = {
  id: number
  name: string
  category: string
  price: string
  description: string
  sizes: string[]
  image: string
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'FA Power Leggings',
    category: 'Bottoms',
    price: '₦18,000',
    description: 'High-waisted compression leggings with hidden pocket.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/api/placeholder/300/400'
  },
  {
    id: 2,
    name: 'Performance Tank Top',
    category: 'Tops',
    price: '₦8,500',
    description: 'Breathable tank top for intense workouts.',
    sizes: ['S', 'M', 'L'],
    image: '/api/placeholder/300/400'
  },
  {
    id: 3,
    name: 'Training Shorts',
    category: 'Bottoms',
    price: '₦12,000',
    description: 'Lightweight shorts with moisture-wicking fabric.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/api/placeholder/300/400'
  },
]

export default function MediaLibrary() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    sizes: ['M'],
    image: ''
  })

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price) {
      const product: Product = {
        ...newProduct,
        id: products.length + 1,
        sizes: newProduct.sizes.filter(size => size.trim() !== '')
      }
      setProducts([...products, product])
      setNewProduct({
        name: '',
        category: '',
        price: '',
        description: '',
        sizes: ['M'],
        image: ''
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Shop Products</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Upload new gym wear product to shop
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Product Name</label>
                <Input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g., FA Power Leggings"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="Tops">Tops</option>
                  <option value="Bottoms">Bottoms</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Footwear">Footwear</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Price (₦)</label>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: `₦${parseInt(e.target.value) || 0}` })}
                  placeholder="18000"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Product description..."
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Available Sizes (comma-separated)</label>
                <Input
                  value={newProduct.sizes.join(', ')}
                  onChange={(e) => setNewProduct({ 
                    ...newProduct, 
                    sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')
                  })}
                  placeholder="S, M, L, XL"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="cursor-pointer">
                Cancel
              </Button>
              <Button onClick={handleAddProduct} className="cursor-pointer">
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square bg-muted flex items-center justify-center">
              {product.image ? (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
              ) : (
                <ImageIcon className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Badge className="mb-2">{product.category}</Badge>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-destructive cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-primary">{product.price}</div>
                  <div className="text-xs text-muted-foreground">
                    Sizes: {product.sizes.join(', ')}
                  </div>
                </div>
                <Button size="sm" variant="outline" className="cursor-pointer">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}