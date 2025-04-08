<template>
    <q-dialog v-model="showDialog">
      <q-card style="width: 800px; max-width: 90vw; font-family: 'Ubuntu', sans-serif;">
        <!-- Botão de fechar no canto superior direito -->
        <q-btn 
          icon="close" 
          flat 
          round 
          dense 
          v-close-popup 
          class="absolute-top-right q-ma-sm"
          style="z-index: 1000;"
        />
  
        <!-- Título "Nova visita virtual" -->
        <q-card-section class="q-pb-none">
          <div class="text-h5 text-weight-normal" style="font-size: 20px;">Nova visita virtual</div>
        </q-card-section>
        <hr style="margin-top: 10px;">
  
        <q-stepper v-model="step" vertical color="primary" animated>
          <!-- Step 1 - Dados Pessoais -->
          <q-step :name="1" title="Dados Pessoais" icon="person" :done="step > 1">
            <q-form @submit="step = 2" class="q-gutter-md">
              <h3 class="text-h6 text-weight-bold q-mb-md">Dados do Visitante</h3>
              
              <q-input
                outlined
                v-model="visitor.name"
                label="Nome Completo *"
                :rules="[val => !!val || 'Campo obrigatório']"
              />
  
              <q-input
                outlined
                v-model="visitor.cpf"
                label="CPF *"
                mask="###.###.###-##"
                :rules="[
                  val => !!val || 'Campo obrigatório',
                  val => val.replace(/\D/g, '').length === 11 || 'CPF inválido'
                ]"
              />
  
              <q-input
                outlined
                v-model="visitor.relationship"
                label="Parentesco com o Preso *"
                :rules="[val => !!val || 'Campo obrigatório']"
              />
  
              <q-input
                outlined
                v-model="visitor.phone"
                label="Telefone *"
                mask="(##) #####-####"
                :rules="[val => !!val || 'Campo obrigatório']"
              />
  
              <div class="row justify-end q-mt-lg q-gutter-sm">
                <q-btn flat label="Cancelar" color="negative" v-close-popup />
                <q-btn label="Próximo" color="primary" type="submit" />
              </div>
            </q-form>
          </q-step>
  
          <!-- Step 2 - Dados do Preso -->
          <q-step :name="2" title="Dados do Preso" icon="lock" :done="step > 2">
            <q-form @submit="step = 3" class="q-gutter-md">
              <h3 class="text-h6 text-weight-bold q-mb-md">Informações do Preso</h3>
  
              <q-input
                outlined
                v-model="prisoner.name"
                label="Nome do Preso *"
                :rules="[val => !!val || 'Campo obrigatório']"
              />
  
              <q-input
                outlined
                v-model="prisoner.id"
                label="Número de Registro *"
                :rules="[val => !!val || 'Campo obrigatório']"
              />
  
              <q-select
                outlined
                v-model="prisonUnit"
                :options="prisonUnits"
                label="Unidade Prisional *"
                :rules="[val => !!val || 'Selecione uma unidade']"
              />
  
              <div class="row justify-end q-mt-lg q-gutter-sm">
                <q-btn flat label="Voltar" color="grey" @click="step = 1" />
                <q-btn label="Próximo" color="primary" type="submit" />
              </div>
            </q-form>
          </q-step>
  
          <!-- Step 3 - Agendamento -->
          <q-step :name="3" title="Agendamento" icon="event" :done="step > 3">
            <div class="q-gutter-md">
              <h3 class="text-h6 text-weight-bold">Selecione a Data</h3>
              <q-date
                v-model="selectedDate"
                :options="filterAvailableDates"
                minimal
                class="custom-calendar"
                style="height: 350px; width: 100%;"
              />
  
              <div class="q-mt-md" v-if="selectedDate">
                <h3 class="text-h6 text-weight-bold">Horários Disponíveis</h3>
                <div class="row q-col-gutter-sm q-mt-sm">
                  <div class="col-auto" v-for="time in availableTimes" :key="time">
                    <q-btn
                      :outline="selectedTime !== time"
                      :color="selectedTime === time ? 'primary' : 'grey-7'"
                      :label="time"
                      @click="selectedTime = time"
                      class="time-btn"
                    />
                  </div>
                </div>
              </div>
  
              <div class="row justify-end q-mt-md q-gutter-sm">
                <q-btn flat label="Voltar" color="grey" @click="step = 2" />
                <q-btn label="Próximo" color="primary" @click="step = 4" 
                  :disabled="!selectedDate || !selectedTime" />
              </div>
            </div>
          </q-step>
  
          <!-- Step 4 - Termos -->
          <q-step :name="4" title="Termos e Condições" icon="description">
            <div class="q-gutter-md">
              <h3 class="text-h6 text-weight-bold">Termos de Visita</h3>
              <q-scroll-area style="height: 200px;" class="q-pa-sm bg-grey-2 rounded-borders">
                <div class="text-body2">
                  <p><strong>1. Documentação Obrigatória:</strong> Apresentar documento original com foto.</p>
                  <p><strong>2. Horários:</strong> Tolerância máxima de 15 minutos de atraso.</p>
                  <p><strong>3. Itens Permitidos:</strong> Alimentos em embalagens transparentes.</p>
                  <p><strong>4. Vestimenta:</strong> Proibido shorts curtos, minissaias ou regatas.</p>
                  <p><strong>5. Comportamento:</strong> Comportamento inadequado cancelará a visita.</p>
                </div>
              </q-scroll-area>
  
              <q-checkbox
                v-model="acceptTerms"
                label="Li e aceito os termos de visita"
                :rules="[val => !!val || 'Você deve aceitar os termos']"
              />
  
              <div class="row justify-end q-mt-md q-gutter-sm">
                <q-btn flat label="Voltar" color="grey" @click="step = 3" />
                <q-btn 
                  label="Confirmar Agendamento" 
                  color="primary" 
                  @click="onSubmit"
                  :disabled="!acceptTerms"
                />
              </div>
            </div>
          </q-step>
  
          <!-- Step 5 - Confirmação -->
          <q-step :name="5" title="Confirmação" icon="check">
            <div class="text-center q-pa-lg">
              <q-icon name="check_circle" color="positive" size="xl" />
              <h3 class="text-h5 text-weight-bold q-mt-md">Agendamento Confirmado!</h3>
              <p class="text-body1 q-mt-sm">Sua visita virtual foi agendada com sucesso.</p>
              
              <div class="text-left q-mt-lg bg-blue-1 q-pa-md rounded-borders">
                <p><strong>Data:</strong> {{ formatDate(selectedDate) }} às {{ selectedTime }}</p>
                <p><strong>Visitante:</strong> {{ visitor.name }}</p>
                <p><strong>Preso:</strong> {{ prisoner.name }} ({{ prisoner.id }})</p>
                <p><strong>Local:</strong> {{ prisonUnit }}</p>
              </div>
  
              <q-btn 
                label="Fechar" 
                color="primary" 
                class="q-mt-lg" 
                v-close-popup 
                @click="resetForm"
              />
            </div>
          </q-step>
        </q-stepper>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  export default {
    name: 'VisitaDialog',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        step: 1,
        visitor: {
          name: '',
          cpf: '',
          relationship: '',
          phone: ''
        },
        prisoner: {
          name: '',
          id: ''
        },
        prisonUnit: null,
        prisonUnits: [
          'Penitenciária Estadual de Segurança Máxima',
          'Presídio Regional Central',
          'Unidade Prisional Feminina',
          'Centro de Detenção Provisória Norte'
        ],
        selectedDate: null,
        selectedTime: null,
        acceptTerms: false,
        availableTimes: [
          '08:00', '09:30', '11:00', 
          '13:30', '15:00', '16:30'
        ]
      }
    },
    computed: {
      showDialog: {
        get() {
          return this.show
        },
        set(value) {
          this.$emit('update:show', value)
        }
      }
    },
    methods: {
      filterAvailableDates(date) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const twoWeeksLater = new Date(today)
        twoWeeksLater.setDate(today.getDate() + 14)
        
        const selected = new Date(date)
        selected.setHours(0, 0, 0, 0)
        
        return selected >= today && 
               selected <= twoWeeksLater &&
               selected.getDay() !== 0 && // Não domingo
               selected.getDay() !== 6 // Não sábado
      },
      
      formatDate(date) {
        if (!date) return ''
        const [year, month, day] = date.split('/')
        return `${day}/${month}/${year}`
      },
      
      onSubmit() {
        const visitData = {
          visitor: { ...this.visitor },
          prisoner: { ...this.prisoner },
          prisonUnit: this.prisonUnit,
          date: this.selectedDate,
          time: this.selectedTime
        }
  
        this.$emit('schedule-visit', visitData)
        this.step = 5
      },
      
      resetForm() {
        this.step = 1
        this.visitor = {
          name: '',
          cpf: '',
          relationship: '',
          phone: ''
        }
        this.prisoner = {
          name: '',
          id: ''
        }
        this.prisonUnit = null
        this.selectedDate = null
        this.selectedTime = null
        this.acceptTerms = false
      }
    }
  }
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');
  
  body {
    font-family: 'Ubuntu', sans-serif;
  }
  
  .custom-calendar {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .custom-calendar .q-date__header {
    background-color: #1976d2;
    color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  .time-btn {
    min-width: 80px;
    border-radius: 6px;
  }
  
  .q-stepper__step-inner {
    padding: 16px;
  }
  </style>