import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DeleteOutlined, BarsOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, ConfigProvider, Input, InputRef, Modal, Rate, Space, Table, TableColumnType, TableProps, Typography } from 'antd';
import { convertNumbertoMoney } from '@/utils';
import { deleteProduct, IProductDetail, retrieveProducts } from '@/redux-toolkit/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/hook';
import { useAlertDispatch } from '@/contexts/AlertContext';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/routes';
import { Helmet } from 'react-helmet-async';
import { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

import "./Inventory.scss"

const Inventory = () => {
    const products = useAppSelector(state => state.product)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchInput = useRef<InputRef>(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    type DataIndex = keyof IProductDetail;

    const dispatch = useAppDispatch()
    const dispatchAlert = useAlertDispatch()

    const navigate = useNavigate()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDeleteProduct = (product: IProductDetail) => {
        dispatchAlert({ loading: true })
        dispatch(deleteProduct({ id: product.id }))
            .then((res) => {
                dispatchAlert({ success: "Xóa sản phẩm thành công" })
            })
            .catch(e => console.log(e))
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUpdateProduct = (id: number) => {
        navigate(`${RoutePath.UpdateProduct}/${id}`)
    }

    const handleCreateProduct = () => {
        navigate(`${RoutePath.CreateProduct}`)
    }

    const getProducts = useCallback(() => {
        dispatchAlert({ loading: true })
        dispatch(retrieveProducts()).then((res) => dispatchAlert({ loading: false }))
    }, [dispatch])

    useEffect(() => {
        getProducts()
    }, [getProducts]);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IProductDetail> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            (record[dataIndex] ?? '')
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                    className='truncate'
                />
            ) : (
                <span className='truncate'>{text}</span>
            ),
    });


    const columns: TableProps<IProductDetail>['columns'] = [
        {
            title: "Ảnh sản phẩm",
            key: "thumbnail",
            render: (_, record) => <Avatar src={record.image} />
        },
        {
            title: "Tên sản phẩm",
            key: "name",
            dataIndex: "name",
            ...getColumnSearchProps('name'),
        },
        {
            title: "Giá cũ",
            key: "old_price",
            sorter: (a, b) => a.old_price - b.old_price,
            render: (_, record) => record.old_price !== 0 && <del>{convertNumbertoMoney(record.old_price)}</del>
        },
        {
            title: "Giá mới",
            key: "new_price",
            sorter: (a, b) => a.new_price - b.new_price,
            render: (_, record) => <span>{convertNumbertoMoney(record.new_price)}</span >,
        },
        {
            title: "Đánh giá",
            key: "review",
            sorter: (a, b) => a.averageRating - b.averageRating,
            render: (_, record) => {
                return <Rate value={record.averageRating} allowHalf disabled />;
            },
        },
        {
            title: "Số lượng",
            key: "available",
            sorter: (a, b) => a.available - b.available,
            render: (_, record) => record.available
        },
        {
            title: "Thương hiệu",
            key: "brand",
            render: (_, record) => <strong>{record.brand}</strong>
        },
        {
            title: "Danh mục sản phẩm",
            key: "category",
            render: (_, record) =>
                <Space direction='vertical' >
                    {record.categories.map((category) => {
                        return <strong className='truncate' key={category.category.name} >{category.category.name}</strong>
                    })}
                </Space>
        },
        {
            title: '',
            key: 'deleteItem',
            render: (_, record) =>
                <div className='flex items-center' >
                    <div className='flex gap-2'>
                        <BarsOutlined className='text-blue-500 text-2xl cursor-pointer transform hover:scale-125' onClick={() => handleUpdateProduct(record.id)} />
                        <DeleteOutlined className='text-red-500 text-2xl cursor-pointer transform hover:scale-125' onClick={showModal} />
                    </div>
                    <ConfigProvider theme={{
                        token: {
                            colorPrimary: '#f48220'
                        }
                    }}>
                        <Modal centered title={<p className='text-red-500'>Xóa sản phẩm {`${record.name}`}</p>} open={isModalOpen} onOk={() => handleDeleteProduct(record)} onCancel={handleCancel}>
                            <p className='text-base'>Bạn muốn xóa sản phẩm này khỏi kho hay không ?</p>
                        </Modal>
                    </ConfigProvider>
                </div >
        },
    ]

    return (
        <>
            <Helmet>
                <title>Kho hàng</title>
                <meta name='description' content='Beginner friendly page for learning React Helmet.' />
            </Helmet>
            <Typography.Title level={4}>Danh sách sản phẩm</Typography.Title>
            <div className='mb-4 flex justify-end'>
                <Button type='primary' icon={<EditOutlined />} onClick={handleCreateProduct}>
                    Thêm mới sản phẩm
                </Button>
            </div>
            <Space direction="horizontal" className='w-full justify-center !block'>
                <Table
                    columns={columns}
                    dataSource={products}
                    pagination={{ position: ['bottomCenter'] }}
                    rowKey={(record) => record.id}
                ></Table>
            </Space>
        </>
    )
}

export default Inventory