import { FC } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
    className?: string
    handlePageClick?: (data: { selected: number }) => void
    data?: Object[]
    totalPage?: number
    current_page?: number
}

const Pagination: FC<PaginationProps> = ({ className, handlePageClick, data = [], totalPage = 1, current_page = 0 }) => {


    return <nav className='my-2.5 mx-auto'>
        <ReactPaginate
            initialPage={current_page}
            pageCount={totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            previousLabel={<BsChevronLeft />}
            nextLabel={<BsChevronRight />}
            className='flex items-center justify-center gap-2 pagination-custom'
            pageClassName={'page-item'}
            disabledClassName='page-item disable'
            breakClassName='page-item'
            previousClassName='page-item'
            nextClassName='page-item'
            activeClassName='active'
        />
    </nav>
}
export default Pagination