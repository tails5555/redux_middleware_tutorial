from rest_framework.pagination import PageNumberPagination

class ListPagination(PageNumberPagination) :
    page_size = 8
    page_size_query_param = 'sz'
    max_page_size = 15