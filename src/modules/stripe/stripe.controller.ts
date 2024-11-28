<<<<<<< HEAD
import { Controller, Post, Body } from '@nestjs/common';
=======
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
>>>>>>> ea0230e5583beb3c36acd510af79be9213fb0345
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: any) {
<<<<<<< HEAD
    console.log('Body recibido:', body); // Log para ver lo que llega

    const { planId, planName, planPrice, currency, userId, userName } = body;

    if (!planId || !planName || !planPrice || !currency) {
      throw new Error(
        'Faltan parámetros necesarios para crear el PaymentIntent',
=======
    const {
      planId,
      planName,
      planPrice,
      currency,
      userId,
      userName,
      cardholderName,
      paymentDate,
    } = body;

    if (
      !planId ||
      !planName ||
      !planPrice ||
      !currency ||
      !userId ||
      !userName ||
      !cardholderName ||
      !paymentDate
    ) {
      throw new HttpException(
        'Faltan parámetros necesarios para crear el PaymentIntent',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (typeof planPrice !== 'number' || planPrice <= 0) {
      throw new HttpException(
        'El precio del plan debe ser un número positivo',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (currency !== 'usd') {
      throw new HttpException(
        'Moneda no soportada, solo se acepta USD',
        HttpStatus.BAD_REQUEST,
>>>>>>> ea0230e5583beb3c36acd510af79be9213fb0345
      );
    }

    const amount = Math.round(planPrice * 100);

<<<<<<< HEAD
    const paymentIntent = await this.stripeService.createPaymentIntent(
      amount,
      currency,
      userId,
      userName,
      planId,
      planName,
    );

    if (!paymentIntent.clientSecret) {
      throw new Error(
        'No se ha generado el clientSecret para el PaymentIntent',
      );
    }

    return { clientSecret: paymentIntent.clientSecret };
=======
    try {
      const paymentIntent = await this.stripeService.createPaymentIntent(
        amount,
        currency,
        userId,
        userName,
        planId,
        planName,
        cardholderName,
        paymentDate,
      );

      if (!paymentIntent.clientSecret) {
        throw new HttpException(
          'No se ha generado el clientSecret para el PaymentIntent',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return { clientSecret: paymentIntent.clientSecret };
    } catch (error) {
      console.error('Error al crear el PaymentIntent:', error);
      throw new HttpException(
        `Error al crear el PaymentIntent: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
>>>>>>> ea0230e5583beb3c36acd510af79be9213fb0345
  }
}
