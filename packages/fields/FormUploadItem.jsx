import { Col, FormItem, Upload, Icon, Message } from "view-design"
const ERROR = "error"
const SUCCESS = "success"
const FORMATE_ERROE = "formateError"
export default {
  name: "FormUploadItem",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  render(h) {
    const { config } = this
    return (
      <Col span={config.span || 24}>
        <FormItem label={config.label} prop={config.key}>
          <Upload
            multiple
            type="drag"
            action={config.action}
            format={config.formate}
            propsOnError={(error, file, fileList) =>
              this.error(error, file, fileList)
            }
            propsOnSuccess={(response, file, fileList) =>
              this.success(response, file, fileList)
            }
            propsOnFormatError={(file, fileList) =>
              this.formateError(file, fileList)
            }
          >
            <div style="padding: 20px 0;">
              <Icon
                type="ios-cloud-upload"
                size="52"
                style="color: #3399ff"
              ></Icon>
              <p style="fontWeight:bolder">{config.uploadtitle}</p>
            </div>
          </Upload>
        </FormItem>
      </Col>
    )
  },
  methods: {
    error(error, file, fileList) {
      Message.error("上传失败!")
      const {
        config: { control },
      } = this
      if (control && ERROR in control) {
        control[ERROR](file, fileList)
      }
    },
    success(response, file, fileList) {
      Message.success("上传成功!")
      const {
        config: { control },
      } = this
      if (control && SUCCESS in control) {
        control[SUCCESS](file, fileList)
      }
    },
    formateError(file, fileList) {
      const {
        config: { control },
      } = this
      Message.error("文件格式验证失败!")
      if (control && FORMATE_ERROE in control) {
        control[FORMATE_ERROE](file, fileList)
      }
    },
  },
}
