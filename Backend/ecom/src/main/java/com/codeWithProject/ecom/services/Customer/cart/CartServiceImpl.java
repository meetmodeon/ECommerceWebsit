package com.codeWithProject.ecom.services.Customer.cart;

import com.codeWithProject.ecom.dto.AddProductCartDto;
import com.codeWithProject.ecom.dto.CartItemsDto;
import com.codeWithProject.ecom.dto.OrderDto;
import com.codeWithProject.ecom.dto.PlaceOrderDto;
import com.codeWithProject.ecom.entity.*;
import com.codeWithProject.ecom.enums.OrderStatus;
import com.codeWithProject.ecom.exceptions.ValidationException;
import com.codeWithProject.ecom.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements  CartService{
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CouponRepository couponRepository;

    public ResponseEntity<?> addProductToCart(AddProductCartDto addProductCartDto){
        Order activeOrder= orderRepository.findByUserIdAndOrderStatus(addProductCartDto.getUserId(), OrderStatus.Pending);
        Optional<CartItems> optionalCartItems = cartItemRepository.findByProductIdAndOrderIdAndUserId(
                addProductCartDto.getProductId(),activeOrder.getId(),addProductCartDto.getUserId()
        );

        if (optionalCartItems.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }else{
            Optional<Product> optionalProduct = productRepository.findById(addProductCartDto.getProductId());
            Optional<User> optionalUser = userRepository.findById(addProductCartDto.getUserId());

            if(optionalProduct.isPresent() && optionalUser.isPresent()){
                CartItems cart=new CartItems();
                cart.setProduct(optionalProduct.get());
                cart.setPrice(optionalProduct.get().getPrice());
                cart.setQuantity(1L);
                cart.setUser(optionalUser.get());
                cart.setOrder(activeOrder);

                CartItems updateCart = cartItemRepository.save(cart);

                activeOrder.setTotalAmount(activeOrder.getTotalAmount() + cart.getPrice());
                activeOrder.setAmount(activeOrder.getAmount() + cart.getPrice());
                activeOrder.getCartItems().add(cart);

                orderRepository.save(activeOrder);
                return ResponseEntity.status(HttpStatus.CREATED).body(cart);
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or product not found");
            }
        }
    }

    public OrderDto getCartByUserId(Long userId){
        Order activeOrder= orderRepository.findByUserIdAndOrderStatus(userId,OrderStatus.Pending);
        List<CartItemsDto> cartItemsDtoList= activeOrder.getCartItems().stream().map(CartItems::getCartDto).collect(Collectors.toList());
        OrderDto orderDto = new OrderDto();
        orderDto.setAmount(activeOrder.getAmount());
        orderDto.setId(activeOrder.getId());
        orderDto.setOrderStatus(activeOrder.getOrderStatus());
        orderDto.setDiscount(activeOrder.getDiscount());
        orderDto.setTotalAmount(activeOrder.getTotalAmount());
        orderDto.setCartItems(cartItemsDtoList);

        if(activeOrder.getCoupon() !=null){
            orderDto.setCouponName(activeOrder.getCoupon().getName());
        }

        return orderDto;
    }

    public OrderDto applyCoupon(Long userId,String code){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(userId,OrderStatus.Pending);
        Coupon coupon = couponRepository.findByCode(code).orElseThrow(()-> new ValidationException("Coupon not found."));

        if(couponIsExpired(coupon)){
            throw new ValidationException("Coupon has expired");
        }
        double discountAmount = ((coupon.getDiscount()/100.0)* activeOrder.getTotalAmount());
        double netAmount = activeOrder.getTotalAmount()- discountAmount;

        activeOrder.setAmount((long)netAmount);
        activeOrder.setDiscount((long)discountAmount);
        activeOrder.setCoupon(coupon);

        orderRepository.save(activeOrder);

        return activeOrder.getOrderDto();

    }

    private boolean couponIsExpired(Coupon coupon){
        Date currentdate= new Date();
        Date expirationDate=coupon.getExpirationDate();

        return expirationDate !=null && currentdate.after(expirationDate);
    }

    public OrderDto increaseProductQuantity(AddProductCartDto addProductCartDto){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductCartDto.getUserId(),OrderStatus.Pending);
        Optional<Product> optionalProduct = productRepository.findById(addProductCartDto.getProductId());

        Optional<CartItems> optionalCartItems = cartItemRepository.findByProductIdAndOrderIdAndUserId(
                addProductCartDto.getProductId(),activeOrder.getId(),addProductCartDto.getUserId()
        );

        if(optionalProduct.isPresent() && optionalCartItems.isPresent()){
            CartItems cartItems = optionalCartItems.get();
            Product product = optionalProduct.get();

            activeOrder.setAmount(activeOrder.getAmount() + product.getPrice());
            activeOrder.setTotalAmount(activeOrder.getTotalAmount() + product.getPrice());

            cartItems.setQuantity(cartItems.getQuantity() + 1);

            if(activeOrder.getCoupon() != null){
                double discountAmount = ((activeOrder.getCoupon().getDiscount() / 100.0) * activeOrder.getTotalAmount());
                double netAmount = activeOrder.getTotalAmount() - discountAmount;

                activeOrder.setAmount((long)netAmount);
                activeOrder.setDiscount((long)discountAmount);

            }
            cartItemRepository.save(cartItems);
            orderRepository.save(activeOrder);
            return activeOrder.getOrderDto();
        }
        return null;
    }

    public OrderDto decreaseProductQuantity(AddProductCartDto addProductCartDto){
        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(addProductCartDto.getUserId(),OrderStatus.Pending);
        Optional<Product> optionalProduct = productRepository.findById(addProductCartDto.getProductId());

        Optional<CartItems> optionalCartItems = cartItemRepository.findByProductIdAndOrderIdAndUserId(
                addProductCartDto.getProductId(),activeOrder.getId(),addProductCartDto.getUserId()
        );

        if(optionalProduct.isPresent() && optionalCartItems.isPresent()){
            CartItems cartItems = optionalCartItems.get();
            Product product = optionalProduct.get();

            activeOrder.setAmount(activeOrder.getAmount() - product.getPrice());
            activeOrder.setTotalAmount(activeOrder.getTotalAmount() - product.getPrice());

            cartItems.setQuantity(cartItems.getQuantity() - 1);

            if(activeOrder.getCoupon() != null){
                double discountAmount = ((activeOrder.getCoupon().getDiscount() / 100.0) * activeOrder.getTotalAmount());
                double netAmount = activeOrder.getTotalAmount() - discountAmount;

                activeOrder.setAmount((long)netAmount);
                activeOrder.setDiscount((long)discountAmount);

            }
            cartItemRepository.save(cartItems);
            orderRepository.save(activeOrder);
            return activeOrder.getOrderDto();
        }
        return null;
    }

    public OrderDto placeOrder(PlaceOrderDto placeOrderDto){

        Order activeOrder = orderRepository.findByUserIdAndOrderStatus(
                placeOrderDto.getUserId(), OrderStatus.Pending);
        Optional<User> optionalUser = userRepository.findById(placeOrderDto.getUserId());

        if (optionalUser.isPresent()) {
            if (activeOrder != null) {
                // Update the existing active order
                activeOrder.setOrderDescription(placeOrderDto.getOrderDescription());
                activeOrder.setAddress(placeOrderDto.getAddress());
                activeOrder.setDate(new Date());
                activeOrder.setOrderStatus(OrderStatus.Placed);
                activeOrder.setTackingId(UUID.randomUUID());

                orderRepository.save(activeOrder);

                // No need to create a new order as the active order was updated
                return activeOrder.getOrderDto();
            } else {
                // Create a new order
                Order newOrder = new Order();
                newOrder.setAmount(0L);
                newOrder.setTotalAmount(0L);
                newOrder.setDiscount(0L);
                newOrder.setUser(optionalUser.get());
                newOrder.setOrderStatus(OrderStatus.Pending);

                orderRepository.save(newOrder);

                return newOrder.getOrderDto();
            }
      }
      return null;
    }

    public List<OrderDto> getMyPlacedOrders(Long userId){
        return orderRepository.findByUserIdAndOrderStatusIn(userId,List.of(OrderStatus.Placed,OrderStatus.Shipped,OrderStatus.Delivered)).stream().map(Order::getOrderDto).collect(Collectors.toList());
    }

    public OrderDto searchOrderByTrackingId(UUID trackingId){
        Optional<Order> optionalOrder = orderRepository.findByTackingId(trackingId);
        if(optionalOrder.isPresent()){
            return optionalOrder.get().getOrderDto();
        }
        return null;
    }

}
