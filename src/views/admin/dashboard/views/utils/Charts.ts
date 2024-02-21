export const lineChartOptions = {
  legend: {
    show: false
  },

  theme: {
    mode: 'light'
  },
  chart: {
    type: 'line',
    toolbar: {
      show: false
    }
  },

  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },

  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000'
    },
    theme: 'dark',
    x: {
      format: 'dd/MM/yy HH:mm'
    }
  },
  grid: {
    show: false
  },
  xaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      style: {
        colors: '#A3AED0',
        fontSize: '12px',
        fontWeight: '500'
      }
    },
    type: 'text',
    range: undefined,
    categories: [
      'jan.',
      'fev.',
      'mar.',
      'abr.',
      'mai.',
      'jun.',
      'jul.',
      'ago.',
      'set.',
      'out.',
      'nov.',
      'dez.'
    ]
  },

  yaxis: {
    show: false
  }
};

export const barChartOptions = {
  chart: {
    toolbar: {
      show: false
    }
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000'
    },
    onDatasetHover: {
      style: {
        fontSize: '12px',
        fontFamily: undefined
      }
    },
    theme: 'dark'
  },
  xaxis: {
    categories: [
      'jan.',
      'fev.',
      'mar.',
      'abr.',
      'mai.',
      'jun.',
      'jul.',
      'ago.',
      'set.',
      'out.',
      'nov.',
      'dez.'
    ],
    show: false,
    labels: {
      show: true,
      style: {
        colors: '#A3AED0',
        fontSize: '14px',
        fontWeight: '500'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false,
    color: 'black',
    labels: {
      show: true,
      style: {
        colors: '#CBD5E0',
        fontSize: '14px'
      }
    }
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true
      }
    },
    xaxis: {
      lines: {
        show: false
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: '#4318FF',
            opacity: 1
          },
          {
            offset: 100,
            color: 'rgba(67, 24, 255, 1)',
            opacity: 0.28
          }
        ]
      ]
    }
  },
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    bar: {
      borderRadius: 3,
      columnWidth: '10px'
    }
  }
};

export const pieChartOptions = {
  labels: ['Total Vendidos', 'Total Stock'],
  colors: ['#4318FF', '#6AD2FF'],
  chart: {
    width: '50px'
  },
  states: {
    hover: {
      filter: {
        type: 'none'
      }
    }
  },
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false
        }
      }
    }
  },
  fill: {
    colors: ['#4318FF', '#6AD2FF', '#EFF4FB']
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000'
    }
  }
};