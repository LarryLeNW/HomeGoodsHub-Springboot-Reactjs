package com.backend.library;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dao.ProductDAO;
import com.backend.entity.CartItem;
import com.backend.entity.Product;

import jakarta.servlet.http.HttpSession;

@Service
public class CartService {
    @Autowired
    ProductDAO productdao;

    public List<CartItem> getCartItems(HttpSession session) {
        List<CartItem> cartItems = (List<CartItem>) session.getAttribute("cartItems");
        if (cartItems == null) {
            cartItems = new ArrayList<>();
            session.setAttribute("cartItems", cartItems);
        }
        System.out.println("hiển thị"+cartItems);
        return cartItems;
    }

    public void addCartItem(HttpSession session, CartItem cartItem) {
        List<CartItem> cartItems = getCartItems(session);
        Product product = productdao.findById(cartItem.getProduct().getProductId()).get();
        CartItem newcart = new CartItem();
        newcart.setProduct(product);
        newcart.setQuantity(cartItem.getQuantity());
        cartItems.add(newcart);
        session.setAttribute("cartItems", cartItems);
        System.out.println(cartItems);
    }

    public void removeCartItem(HttpSession session, int itemId) {
        List<CartItem> cartItems = getCartItems(session);
        cartItems.removeIf(item -> item.getProduct().getProductId() == itemId);
        session.setAttribute("cartItems", cartItems);
    }
}
