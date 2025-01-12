package com.codeWithProject.ecom.services.admin.adminOrder;

import com.codeWithProject.ecom.dto.AnalyticsResponse;
import com.codeWithProject.ecom.dto.OrderDto;

import java.util.List;

public interface AdminOrderService {

    List<OrderDto> getAllPlacedOrders();
    OrderDto changeOrderStatus(Long orderId,String status);
    AnalyticsResponse calculateAnalytics();
}
