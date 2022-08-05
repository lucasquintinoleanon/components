import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import urljoin from 'url-join';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';
import { format, isValid } from 'date-fns';
import { actions as cartActions } from '../../reducers/cart';
import { actions as purchasesActions } from '../../reducers/purchases';
import { actions as modalActions } from '../../reducers/modal';
import formatToCurrency from '../../utils/formatToCurrency';
import {
  AUTH_LOGIN,
  BOLETO,
  CREDIT_CARD,
  BASE_URL_API,
  PAGE_HOME,
  CREDITS,
  PAGAR_ME_KEY,
  BASE_URL_CDN,
  PAGE_COURSES
} from '../../constants';

const logo = `${BASE_URL_CDN}app/assets/images/LOGO.svg`;

const ModalCart = ({ setAuthType }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const currentUser = useSelector(state => state.user);
  const [coupon, setCoupon] = useState('');
  const [currencyMoney, setCurrencyMoney] = useState(true);

  const cartModalIsOpen = useSelector(state => state.modal.cartModalIsOpen);
  const setCartModalIsOpen = bool => dispatch(modalActions.setCartModalIsOpen(bool));
  const authModalIsOpen = useSelector(state => state.modal.authModalIsOpen);
  const setAuthModalIsOpen = bool => dispatch(modalActions.setAuthModalIsOpen(bool));

  const emptyCart = cart?.products?.length === 0;
  const notEnoughCredits = !currencyMoney && cart?.availableCredits < cart.totalCredits;
  const disabledPurchaseCredits = !currencyMoney && (notEnoughCredits || !cart?.totalCredits);
  const handleChooseMoreCourses = () => {
    setCartModalIsOpen(false);
    history.push(PAGE_COURSES);
  };

  const openCheckout = () => {
    window.dataLayer.push({
      'event': 'checkout',
      'ecommerce': {
        'checkout': {
          'products': cart.products.map(product => ({
            'name': product.title,
            'id': product.productId,
            'price': product.prices?.salePrice || product.prices?.price,
            'brand': 'Descola',
            'quantity': 1
          }))
        }
      }
    });

    const checkout = new window.PagarMeCheckout.Checkout({
      'encryption_key': PAGAR_ME_KEY,
      success(data) {
        dispatch(
          purchasesActions.createOrderRequest(
            {
              'addressId': currentUser.addressId,
              'payment': {
                'type': data.payment_method === 'boleto' ? BOLETO : CREDIT_CARD,
                'token': data.token
              },
              cart
            },
            history
          )
        );
      },
      error() {
        // console.log('err', err);
      },
      close() {
        // console.log('fechou');
      }
    });

    const pagarMePayload = {
      'amount': (cart.grandTotal * 100).toFixed(0),
      'uiColor': '#fc4303',
      'buttonText': 'Pagar',
      'createToken': 'true',
      'paymentMethods': 'credit_card, boleto',
      'card_brands': 'visa,mastercard,amex,aura,jcb,diners,elo,hipercard',
      'postbackUrl': urljoin(BASE_URL_API, '/v1/payments/postback'),
      'maxInstallments': cart.maxInstallments,
      'interestRate': cart.interestRate,
      'freeInstallments': cart.interestRate ? 1 : cart.maxInstallments,
      'customerData': 'true',
      'reviewInformations': 'true',
      'customer': {
        'external_id': currentUser.id,
        'name': `${currentUser.firstName} ${currentUser.lastName}`,
        'email': currentUser.email,
        'type': 'individual',
        'country': 'br',
        'documents': [
          {
            'type': 'cpf',
            'number': currentUser.documentNumber
          }
        ],
        'phone_numbers': currentUser.ddd && currentUser.phoneNumber ? [`${currentUser.ddd}${currentUser.phoneNumber}`] : []
      }
    };

    const address = {
      'name': `${currentUser?.firstName} ${currentUser?.lastName}`,
      'address': {
        'country': 'br',
        'state': currentUser?.address && currentUser?.address[0]?.state,
        'city': currentUser?.address && currentUser?.address[0]?.city,
        'complementary': currentUser?.address && currentUser?.address[0]?.complement,
        'neighborhood': currentUser?.address && currentUser?.address[0]?.neighborhood,
        'street': currentUser?.address && currentUser?.address[0]?.street,
        'street_number': currentUser?.address && currentUser?.address[0]?.number,
        'zipcode': currentUser?.address && currentUser?.address[0]?.zipcode
      }
    };
    if (currentUser?.address && currentUser?.address[0]?.length > 0) {
      pagarMePayload.billing = address;
    }

    checkout.open(pagarMePayload);
  };

  const onHandleFinishPurchase = () => {
    if (currentUser.email) {
      if (currencyMoney) {
        openCheckout();
      } else {
        dispatch(
          purchasesActions.createOrderRequest(
            {
              'payment': {
                'type': CREDITS
              },
              cart
            },
            history
          )
        );
      }
    } else {
      setAuthType(AUTH_LOGIN);
      setAuthModalIsOpen(true);
    }
  };

  const onHandleRemoveProduct = product => {
    window.dataLayer.push({
      'event': 'removeFromCart',
      'ecommerce': {
        'remove': {
          'products': [
            {
              'name': product.title,
              'id': product.productId,
              'price': product.prices?.salePrice || product.prices?.price,
              'brand': 'Descola',
              'quantity': 1
            }
          ]
        }
      }
    });
    dispatch(cartActions.removeRequest(product.id));
  };

  const onCloseModalCart = () => {
    setCartModalIsOpen(false);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      dispatch(cartActions.validateCouponRequest(coupon));
    }
  };

  const totalCart = () => {
    if (currencyMoney) {
      if (cart.coupon?.id) {
        return (
          <>
            <div className="cart__total__reais--sub">{formatToCurrency(cart.total)}</div>
            <div className="cart__total__reais--off"> - {formatToCurrency(cart.discount)}</div>
            {formatToCurrency(cart.grandTotal)}{' '}
          </>
        );
      }
      return formatToCurrency(cart.total);
    }
    if (!cart.totalCredits) {
      return '-';
    }
    return cart.totalCredits;
  };

  const totalProduct = product => {
    if (currencyMoney) {
      if (product.prices.discount) {
        return (
          <>
            <span className="antigo">{formatToCurrency(product.prices?.salePrice || product.prices.price)}</span>{' '}
            <span className="novo">
              {formatToCurrency((product.prices?.salePrice || product.prices.price) - product.prices.discount)}
            </span>{' '}
          </>
        );
      }
      return formatToCurrency(product.prices?.salePrice || product.prices?.price);
    }
    return product.prices?.creditsPrice;
  };

  return (
    <>
      <ScrollLock isActive={(authModalIsOpen && !currentUser.email) || cartModalIsOpen} />
      <div
        className={classNames('popup__overlay', {
          'popup__overlay--hidden': !cartModalIsOpen || (authModalIsOpen && !currentUser.email)
        })}
      >
        <div className="popup__background" onClick={() => setCartModalIsOpen(false)} />
        <TouchScrollable>
          <div className="popup__screen popup__screen--cart">
            <div className="arrow__right" onClick={onCloseModalCart} />
            <span className="logo">
              <img src={logo} alt="Descola" width={80} height={55} />
            </span>
            <div className="cart">
              <div className="title-bar">
                <h3>Resumo do pedido</h3>
                {!emptyCart && (
                  <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <button
                      className={classNames('btn btn-outline-primary', { active: currencyMoney })}
                      onClick={() => setCurrencyMoney(true)}
                    >
                      Dinheiro
                    </button>
                    <button
                      className={classNames('btn btn-outline-primary', { active: !currencyMoney })}
                      onClick={() => setCurrencyMoney(false)}
                    >
                      Créditos
                    </button>
                  </div>
                )}
              </div>
              {!currencyMoney && (
                <div className="cart__credits">
                  Seus Créditos
                  <div className="cart__credits__value">{cart.availableCredits || 0}</div>
                </div>
              )}
              <div className="cart__itens">
                {emptyCart && <div className="cart__itens__msg">Você ainda não tem nenhum curso no carrinho.</div>}
                {cart?.products?.map(product => (
                  <div key={product.id}>
                    <div
                      className={classNames('cart__item', {
                        'cart__item--secondary': product.type === 3,
                        'cart__item--tertiary': product.type === 2
                      })}
                    >
                      <div className="cart__item__img">
                        <picture>
                          <img
                            srcSet={`${product.secondaryImage}?w=72&h=72, ${product.secondaryImage}?w=144&h=144 2x`}
                            alt={product.title}
                            width={72}
                            height={72}
                          />
                        </picture>
                      </div>
                      <div className="cart__item__content">
                        <h3>{product.title}</h3>
                        {product?.preOrder && (
                          <p>
                            Pré-venda: Disponível a partir de{' '}
                            {isValid(product?.launchDate * 1000) && format(product?.launchDate * 1000, 'dd/MM/yyyy')}
                          </p>
                        )}
                      </div>
                      <div className="cart__item__price">
                        valor
                        <div
                          className={classNames({
                            'cart__item__price__reais': currencyMoney,
                            'cart__item__price__credits': !currencyMoney
                          })}
                        >
                          {totalProduct(product)}
                        </div>
                      </div>
                      <button className="btn btn-remove" onClick={() => onHandleRemoveProduct(product)}>
                        remover
                      </button>
                    </div>
                    <div className="feedback-invalid">
                      {!currencyMoney && !product.prices?.creditsPrice && <>Este produto não pode ser comprado com créditos</>}
                    </div>
                  </div>
                ))}
              </div>
              {currencyMoney && !emptyCart && (
                <div className="cart__coupon">
                  {cart?.coupon?.id ? (
                    <>
                      <strong>Cupom adicionado!</strong>
                      <div className="card-coupon">
                        <h3>{cart.coupon.title}</h3>
                        <button className="btn btn-remove" onClick={() => dispatch(cartActions.removeCouponRequest(coupon))}>
                          remover
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="form-group">
                        <label>Possui algum cupom?</label>
                        <input
                          className="input-box"
                          type="text"
                          value={coupon}
                          onChange={e => setCoupon(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                        <button className="btn btn-primary" onClick={() => dispatch(cartActions.validateCouponRequest(coupon))}>
                          Adicionar
                        </button>
                      </div>
                      <span className="feedback-invalid">{cart.couponError}</span>
                    </>
                  )}
                </div>
              )}
              {!emptyCart && (
                <div className="cart__total">
                  Total
                  <div className={classNames({ 'cart__total__reais': currencyMoney, 'cart__total__credits': !currencyMoney })}>
                    {totalCart()}
                  </div>
                </div>
              )}
              <div className="cart__buttons">
                {!emptyCart && (
                  <>
                    <button
                      className="btn btn-primary"
                      disabled={!cart?.products?.length || disabledPurchaseCredits}
                      onClick={onHandleFinishPurchase}
                    >
                      Finalizar a compra
                    </button>
                    <div className="feedback-invalid">
                      {notEnoughCredits && (
                        <>
                          Você não tem créditos suficientes, compre mais{' '}
                          <Link to={`${PAGE_HOME}#creditos`} onClick={onCloseModalCart}>
                            aqui
                          </Link>
                        </>
                      )}
                    </div>
                  </>
                )}
                <button className="btn btn-outline-primary" onClick={handleChooseMoreCourses}>
                  Escolha mais cursos
                </button>
              </div>
            </div>
          </div>
        </TouchScrollable>
      </div>
    </>
  );
};

ModalCart.propTypes = {
  setAuthType: PropTypes.func
};

ModalCart.defaultProps = {
  setAuthType: () => {}
};

export default ModalCart;
